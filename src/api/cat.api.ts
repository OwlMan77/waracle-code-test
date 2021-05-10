import ky from 'ky';
import.meta.env.VITE_CAT_API_KEY

const api = ky.create({prefixUrl: 'https://api.thecatapi.com/v1', headers: {'x-api-key': `${import.meta.env.VITE_CAT_API_KEY}`}})

// Part 1 Upload - handled by form

// Part 2 Listing
export const list = async (subId: string) => {
    return api.get(`/images/search?sub_id=${subId}&include_vote=1&include_favourite=1`)
}

// Part 3 Favourite
export const favourite = async (body: {image_id: string, sub_id: string}) => {
    return api.post(`favourites`, {json: body})
}

// Part 3 Unfavourite
export const unfavourite = async (body: {image_id: string, sub_id: string}) => {
    return api.delete(`favourites`, {json: body})
}

