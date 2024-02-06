'use client'

import { Layout } from "components/layout"
import { NodeDatavizCard } from "components/node--dataviz--card"
import { NodeDatavizFlipCard } from "components/node--dataviz--flipcard"
import { useEffect, useState } from "react"

export default function DatavizDynamicPage() {
    const [availableTypes, setAvailableTypes] = useState<any[]>([])
    const [availableEditions, setAvailableEditions] = useState<any[]>([])
    const [selectedTypes, setSelectedTypes] = useState<any[]>([])
    const [selectedEditions, setSelectedEditions] = useState<any[]>([])
    const [nodesCol, setNodesCol] = useState<any[]>([])
    const [flipCard, setFlipCard] = useState<boolean>(false)

    const nCol = 3;

    const baseUrl = "https://phpstack-454602-4173726.cloudwaysapps.com"

    useEffect(() => {
        const types = fetch(baseUrl+'/jsonapi/taxonomy_term/challenge_category').then(res => {
            return res.json()
        }).then(res => {
            setAvailableTypes(res.data)
            // select all types by default
            setSelectedTypes(res.data)
        })
        
        const editions = fetch(baseUrl+'/jsonapi/taxonomy_term/challenge_edition').then(res => {
            return res.json()
        }).then(res => {
            setAvailableEditions(res.data)
            // select all types by default
            setSelectedEditions(res.data)
        })
    }, [])


    useEffect(() => {
        const filterStr = ''
        const relationships = ['field_dataviz_img','field_dataviz_year','field_dataviz_type']
        let datavizUrl = `${baseUrl}/jsonapi/node/dataviz?include=${relationships.join(',')}`
        if (selectedTypes.length > 0) {
            datavizUrl += '&filter[field_dataviz_type][condition][path]=field_dataviz_type.id&filter[field_dataviz_type][condition][operator]=IN'
            selectedTypes.forEach((type,idx) => {
                datavizUrl += `&filter[field_dataviz_type][condition][value][${idx+1}]=${type.id}`
            })
        }
        if (selectedEditions.length > 0) {
            datavizUrl += '&filter[field_dataviz_year][condition][path]=field_dataviz_year.id&filter[field_dataviz_year][condition][operator]=IN'
            selectedEditions.forEach((edition,idx) => {
                datavizUrl += `&filter[field_dataviz_year][condition][value][${idx+1}]=${edition.id}`
            })
        }
        const nodes = fetch(datavizUrl).then(res => res.json()).then(res => {
            let nodesCol = []
            for (let i = 0; i < nCol; i++) {
                nodesCol.push(res.data.filter((node, idx) => idx%nCol == i ).map(node => {
                    // reconstruct relationships as attributes
                    relationships.forEach(relationship => {
                        res.included.find(included => included.id == node.relationships[relationship].data.id)
                        node.attributes[relationship] = res.included.find(included => included.id == node.relationships[relationship].data.id).attributes
                        if (node.relationships[relationship].data.meta) {
                            node.attributes[relationship].resourceIdObjMeta = node.relationships[relationship].data.meta
                        }
                    })
                    return {
                        id: node.id,
                        ...node.attributes
                    }
                }))
            }
            setNodesCol(nodesCol)
        })
    }, [selectedTypes, selectedEditions])

    return (
        <Layout>
            <h1 className="mb-10 text-6xl font-black">Dataviz entries</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                <div className="border border-gray-200 p-4">
                    <p>Filter by type of entry</p>
                    <ul>
                        {availableTypes.map(type => (
                            <li key={type.id} className="flex items-center">
                                {/* <input type="checkbox" id={`${type.id}-option`} value="" className="hidden peer" checked={selectedTypes.includes(type)} onChange={e => { selectedTypes.includes(type) ? setSelectedTypes(selectedTypes.filter(el => el != type)) : setSelectedTypes([...selectedTypes, type])}} />
                                <label htmlFor={`${type.id}-option`} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">{type.attributes.name}</div>
                                    </div>
                                </label> */}
                                <input
                                    id={`${type.id}-option`}
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={selectedTypes.includes(type)}
                                    onChange={e => { selectedTypes.includes(type) ? setSelectedTypes(selectedTypes.filter(el => el != type)) : setSelectedTypes([...selectedTypes, type])}}
                                />
                                <label
                                    htmlFor="default-checkbox"
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {type.attributes.name}
                                </label>

                            </li>
                        ))}
                    </ul>
                </div>
                <div className="border border-gray-200 p-4">
                    <p>Filter by edition</p>
                    <ul>
                        {availableEditions.map(edition => (
                            <li key={edition.id} className="flex items-center">
                                {/* <input type="checkbox" id={`${type.id}-option`} value="" className="hidden peer" checked={selectedTypes.includes(type)} onChange={e => { selectedTypes.includes(type) ? setSelectedTypes(selectedTypes.filter(el => el != type)) : setSelectedTypes([...selectedTypes, type])}} />
                                <label htmlFor={`${type.id}-option`} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">{type.attributes.name}</div>
                                    </div>
                                </label> */}
                                <input
                                    id={`${edition.id}-option`}
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={selectedEditions.includes(edition)}
                                    onChange={e => { selectedEditions.includes(edition) ? setSelectedEditions(selectedEditions.filter(el => el != edition)) : setSelectedEditions([...selectedEditions, edition])}}
                                />
                                <label
                                    htmlFor="default-checkbox"
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {edition.attributes.name}
                                </label>

                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            value="" 
                            className="sr-only peer" 
                            onChange={e => { setFlipCard(!flipCard)}}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Use Flip cards</span>
                    </label>
                </div>
            </div>
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> */}
            {nodesCol?.length ?  (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {nodesCol.map((nodeCol, idx) => (
                <div key={idx} className="flex flex-col bg-white overflow-hidden">
                {nodeCol.map(node => (
                <div key={node.id}>
                    {flipCard ? 
                        <NodeDatavizFlipCard node={node} /> :
                        <NodeDatavizCard node={node} />
                    }
                </div>
                ))}
                </div>
            ))}
            </div>
            ) : (
            <p className="py-4">No nodes found</p>
            )}
        </Layout>
    )
}