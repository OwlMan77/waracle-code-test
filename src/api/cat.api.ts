import ky from 'ky';
import { VoteResponse } from '../models/votes.model';
import.meta.env.VITE_CAT_API_KEY

const api = ky.create({prefixUrl: 'https://api.thecatapi.com/v1', headers: {'x-api-key': `${import.meta.env.VITE_CAT_API_KEY}`}})

/* static variable would like to use a cookie with uuid instead*/
export const subId = 'warracle'

// Part 1 Upload - handled by form
export const upload = async (formData: FormData) => {
    return api.post(`images/upload`, {body: formData}).then((data) => data.json())
}

// Part 2 Listing
export const list = async (subId: string) => {
    return api.get(`images/search?sub_id=${subId}&limit=20&include_vote=1&include_favourite=1`).then((data) => data.json())
}

// Part 3 Favourite
export const favourite = async (body: {image_id: string, sub_id: string}) => {
    return api.post(`favourites`, {json: body}).then((data) => data.json())
}

// Part 3 Unfavourite
export const unfavourite = async (body: {image_id: string, sub_id: string}, favouriteId: string) => {
    return api.delete(`favourites/${favouriteId}`, {json: body}).then((data) => data.json())
}

// Part 4 vote
export const vote = async (body: {image_id: string, sub_id: string, value?: 0 | 1}) => {
    return api.post(`votes`, {json: body}).then((data) => data.json())
}

// Part 4 vote
export const getVotes = async (subId: string): Promise<VoteResponse[]> => {
    return api.get(`votes?sub_id=${subId}`).then(async (data) => (await data.json()) as VoteResponse[])
}

