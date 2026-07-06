import React from 'react'
import { Link } from 'react-router-dom'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import BoxIcon from '../../../../components/elements/icons/BoxIcon'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import { getBatchById } from '../batches/batchMockData'
import { placeholderProducts, productCategoryColorMap } from './productMockData'
import { unSlugify } from '../../../../utils/utils'

const ProductCard = ({ product }) => {
  const batch = getBatchById(product.batch)
  const categoryColors = productCategoryColorMap[product.category] || productCategoryColorMap.other

  return (
    <Link
      to={`/producer/products/product/${product.id}`}
      className="w-full p-4 rounded-xl border border-transparent bg-white dark:bg-at-dark-gray/5 hover:border-gray-200 dark:hover:border-gray-700/40 shadow-xl shadow-black/5 transition duration-200 block"
    >
      <div className="flex items-start justify-between gap-x-3">
        <div>
          <p className="text-sm font-semibold font-space-grotesk">{product.name}</p>
          <p className="text-xs opacity-70 mt-1">{product.labelCode}</p>
        </div>
        <ArrowIcon className="w-4 h-4 mt-0.5 opacity-60" />
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <span className={`text-[10px] px-2 py-1 rounded-full ${categoryColors.bg} ${categoryColors.text} capitalize`}>
          {unSlugify(product.category)}
        </span>
        <span className="text-[10px] px-2 py-1 rounded-full bg-at-dark-gray/10 dark:bg-at-dark-surface capitalize">
          {unSlugify(product.type)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="p-2.5 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
          <p className="text-[11px] opacity-60">Quantity</p>
          <p className="text-sm font-semibold mt-0.5">{product.quantity.amount} {product.quantity.unit}</p>
        </div>
        <div className="p-2.5 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
          <p className="text-[11px] opacity-60">QR Scans</p>
          <p className="text-sm font-semibold mt-0.5">{product.qrScanCount}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-x-1 text-xs opacity-75">
        <BoxIcon className="w-3.5 h-3.5" />
        <span>Batch: {batch?.batchCode || product.batch}</span>
      </div>

      <div className="mt-2 flex items-center gap-x-1 text-xs opacity-70">
        <CalendarIcon className="w-3.5 h-3.5" />
        <span>Updated {new Date(product.updatedAt).toLocaleDateString()}</span>
      </div>
    </Link>
  )
}

const Products = () => {
  const products = [...placeholderProducts].sort((firstProduct, secondProduct) => new Date(secondProduct.updatedAt) - new Date(firstProduct.updatedAt))
  const wholeBatchCount = products.filter((item) => item.wholeBatch).length
  const totalScans = products.reduce((sum, item) => sum + (item.qrScanCount || 0), 0)

  return (
    <div className="w-full space-y-4">
      <div className="">
        <p className="text-xs opacity-70">Producer Product Register</p>
        <h1 className="font-semibold font-space-grotesk mt-1">Products</h1>
        <p className="text-sm opacity-75 mt-2 max-w-2xl">
          Monitor processed outputs, quantity, packaging, and trace labels generated from your batches.
        </p>
      </div>

      <div className="">
        {products.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm opacity-60">No products have been created yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products