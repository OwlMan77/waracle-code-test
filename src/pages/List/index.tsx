import './index.css'
import React, { useEffect, useState } from 'react'
import * as catAPI from '../../api/cat.api'
import Card, { CardProps } from '../../components/Card'
import Error from '../../components/Error'
import {CatImageResponseItem} from './../../models/images.model'
import Loader from '../../components/Loader'

const createListItems = (response: CatImageResponseItem[], preload=true): JSX.Element[] => {
    const items: JSX.Element[] = []
    response.forEach((data, i) => {

        if (preload) {
            // preloads images into cache plesae use paginations for 50+ images
            const img = new Image();
            img.src = data.url; 
        }

        const props: CardProps = {
            imageId: data.id,
            imageUrl: data.url,
            loadedScore: data.value,
            favourite: data.favourite ?? {id: undefined}
        }

        items.push(<Card key={`${i}-cat`} {...props}></Card>)
    })

    return items;
}

function List() {
    const [error, setError] = useState('')
    const [pageItems, setPageItems] = useState<JSX.Element[]>([])
    const [loading, setLoader] = useState(true)

    useEffect(() => {
        catAPI.list(catAPI.subId)
            .then(async (data) => {
                const votes = await catAPI.getVotes(catAPI.subId)

                return data.map((item: any) => {
                    const value = votes.find((vote) => {
                        vote.image_id === item.id
                    })?.value;

                    return {
                        ...item,
                        value: value ?? 0
                    }
                } )
            })
            .then((data) => {
                setPageItems(createListItems(data))
                setTimeout(() => setLoader(false), 500)
 
            })
            .catch((err) => {
                console.error(err)
                setError('Unable to load cats, please refresh and try again')
                setLoader(false)
            })
    }, [])
    return (
      <div className="page List">
          <div className="grid">
            {loading ? <Loader />: pageItems}
          </div>
          <Error errorMessage={error} />
      </div>
    )
}
  
export default List