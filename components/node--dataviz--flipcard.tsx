import Image from "next/image"
import Link from "next/link"

import { absoluteUrl } from "lib/utils"

import styles from './styles.module.css';

import {NodeDatavizCardProps} from "./node--dataviz--card"

export function NodeDatavizFlipCard({ node, ...props }: NodeDatavizCardProps) {
  return (
    <article key={node.id} {...props}>
      <div className={styles.flipCard}>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <Image
                className="rounded-t-lg mx-auto"
                src={absoluteUrl(node.field_dataviz_img.uri.url)}
                title={node.field_dataviz_img.resourceIdObjMeta.title}
                width={node.field_dataviz_img.resourceIdObjMeta.width}
                height={node.field_dataviz_img.resourceIdObjMeta.height}
                alt={node.field_dataviz_img.resourceIdObjMeta.alt}
              />
          </div>
          <div className={styles.flipCardBack}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" dangerouslySetInnerHTML={{__html: node.field_dataviz_title.value }}></h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{__html: `${node.field_dataviz_owner.value} <span className="text-xs">(${node.field_dataviz_country.value})</span>`  }}></p>
            <a href={node.field_dataviz_button.uri} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View dataviz
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
