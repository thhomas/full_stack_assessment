import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeDatavizTeaserProps {
  node: DrupalNode
}

export function NodeDatavizTeaser({ node, ...props }: NodeDatavizTeaserProps) {
  return (
    <article {...props}>
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2">
        <a href="#">
          {node.field_dataviz_img && (
              <Image
                className="rounded-t-lg mx-auto"
                src={absoluteUrl(node.field_dataviz_img.uri.url)}
                title={node.field_dataviz_img.resourceIdObjMeta.title}
                width={node.field_dataviz_img.resourceIdObjMeta.width}
                height={node.field_dataviz_img.resourceIdObjMeta.height}
                alt={node.field_dataviz_img.resourceIdObjMeta.alt}
              />
          )}
        </a>
        <div className="p-5">
          <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" dangerouslySetInnerHTML={{__html: node.field_dataviz_title.value }}></h5>
          </a>
          <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 ${node.field_dataviz_type.name.startsWith("Interactive")?"bg-gray-100 text-gray-800 dark:text-gray-400 border-gray-500":"bg-blue-100 text-blue-800 dark:text-blue-400 border-blue-400"} border`}>{node.field_dataviz_type.name}</span>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{__html: `${node.field_dataviz_owner.value} <span className="text-xs">(${node.field_dataviz_country.value})</span>`  }}></p>
          <a href={node.field_dataviz_button.uri} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              View dataviz
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </a>
      </div>
    </div>
    </article>
  )
}
