import { createHash } from 'crypto';

import dotenv from "dotenv"
dotenv.config()

const publicKey = process.env.PUBKEY
const privateKey = process.env.PRIKEY

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const ts = new Date().getTime();
    url += "&apikey=" + publicKey
    url += "&ts=" + ts
    url += "&hash=" + await getHash(publicKey, privateKey, ts);
    const response = await fetch(url)
    const data = await response.json()
    const personnages = []
    data.data.results.forEach(e=>{

        if(!e.thumbnail.path.endsWith("image_not_available")) personnages.push({name : e.name ,img : e.thumbnail.path +"."+ e.thumbnail.extension})
    })
    return personnages
}

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
const getHash = async (publicKey, privateKey, timestamp) => {
    // A compléter
    return createHash('md5').update(timestamp + privateKey + publicKey).digest("hex");
}



