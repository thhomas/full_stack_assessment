import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeDatavizTeaser } from "components/node--dataviz--teaser"
import { useEffect, useState } from "react"

interface IndexPageProps {
  nodes: DrupalNode[],
  types: DrupalTaxonomyTerm[]
}

export default function DatavizPage({ nodes, types }: IndexPageProps) {
  const [selectedTypes, setSelectedTypes] = useState<DrupalTaxonomyTerm[]>(types)
  const [filterNodes, setFilterNodes] = useState<DrupalNode[]>(nodes)
  const nCol = 3;
  
  let nodesCol = []
  for (let i = 0; i < nCol; i++) {
    nodesCol.push(nodes.filter((node, idx) => idx%nCol == i ))
  }

  useEffect(() => {
    console.log(selectedTypes)
  }, [selectedTypes])

  return (
    <Layout>
      <h1 className="mb-10 text-6xl font-black">Dataviz entries</h1>
        {nodes?.length ?  (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {nodesCol.map((nodeCol, idx) => (
            <div key={idx} className="flex flex-col bg-white overflow-hidden">
            {nodeCol.map(node => (
              <div key={node.id}>
                <NodeDatavizTeaser node={node} />
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

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const types = await drupal.getResourceCollectionFromContext<DrupalTaxonomyTerm[]>(
    "taxonomy_term--challenge_category",
    context,
    {
      params: {
        "fields[taxonomy_term--challenge_category]": "name",
      },
    }
  )
  const params = {
        "fields[node--dataviz]": "field_dataviz_title,field_dataviz_owner,field_dataviz_year,field_dataviz_type,field_dataviz_country,field_dataviz_button,field_dataviz_img,uid,created",
        include: "field_dataviz_img,field_dataviz_year, field_dataviz_type,uid",
        sort: "-created",
      }
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--dataviz",
    context,
    {
      params: params
    }
  )

  return {
    props: {
      nodes,
      types,
    },
  }
}
