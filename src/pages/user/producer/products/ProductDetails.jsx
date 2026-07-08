import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import ArrowDownTrayIcon from '../../../../components/elements/icons/ArrowDownTrayIcon'
import BoxIcon from '../../../../components/elements/icons/BoxIcon'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import { productCategoryColorMap } from './productMockData'
import { authHeader, baseUrl, unSlugify } from '../../../../utils/utils'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ERROR } from '../../../../store/types';
import Loader from '../../../../components/elements/Loader';

const ProductDetails = () => {
  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const categoryColors = productCategoryColorMap[product?.category] || productCategoryColorMap.other
  const qrPayload = `agrotrace://product/${product?.id}/${product?.labelCode}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(qrPayload)}`

  useEffect(() => {
    // Fetch product details based on productId
    const fetchedProductDetails = async () =>{
      try {
        const headers = authHeader()
        const response = await axios.get(`${baseUrl}/products/${productId}?expand=batch,sourceAsset,createdBy,location`, { headers })
        setProduct(response.data.data)
      } catch (error) {
        console.error('Error fetching product details:', error) 
        dispatch({
          type: ERROR,
          error
        })
      } finally {
        setLoading(false)
      }
    }  
    fetchedProductDetails()
  }, [productId])

  return (
    <>
      {loading ? 
        <Loader />
      :
        <div className="w-full space-y-4">
          <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
            <div className="mb-4">
              <div>
                <p className="text-xs opacity-70">Product Details</p>
                <h1 className="text-lg font-semibold font-space-grotesk mt-1">{product?.name}</h1>
                <p className="text-xs opacity-70 mt-1">{product?.labelCode}</p>
                <p className="text-xs opacity-70 mt-1">From {product?.sourceAsset?.name}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                <span className={`text-[10px] px-2 py-1 rounded-full ${categoryColors.bg} ${categoryColors.text} capitalize`}>
                  {unSlugify(product?.category)}
                </span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-at-dark-gray/10 dark:bg-at-dark-surface capitalize">
                  {unSlugify(product?.type)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                <p className="text-xs opacity-60 mb-1">Quantity</p>
                <p className="text-sm font-semibold">{product?.quantity?.amount} {product?.quantity?.unit}</p>
              </div>
              <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                <p className="text-xs opacity-60 mb-1">Yield Percentage</p>
                <p className="text-sm font-semibold">{product?.yieldPercentage ? `${product.yieldPercentage}%` : 'N/A'}</p>
              </div>
              <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                <p className="text-xs opacity-60 mb-1">Whole Batch</p>
                <p className="text-sm font-semibold">{product?.wholeBatch ? 'Yes' : 'No'}</p>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface text-sm">
              <p className="text-xs opacity-60 mb-1">Processing Method</p>
              <p>{product?.processingMethod || 'N/A'}</p>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface text-sm">
              <p className="text-xs opacity-60 mb-1">Storage Condition</p>
              <p>{product?.storageCondition || 'N/A'}</p>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface text-sm">
              <p className="text-xs opacity-60 mb-1">Packing Type</p>
              <p>{product?.packingType || 'N/A'}</p>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs opacity-70">
              <span className="inline-flex items-center gap-x-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                Created {new Date(product?.createdAt).toLocaleDateString()}
              </span>
              <span className="inline-flex items-center gap-x-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                Updated {new Date(product?.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
            <div className="mb-4 flex items-center justify-between gap-x-3">
              <div>
                <p className="text-xs opacity-70">Traceability</p>
                <h3 className="text-md font-semibold font-space-grotesk mt-1">Product QR Code</h3>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-60">Total Scans</p>
                <p className="text-lg font-semibold font-space-grotesk">{product?.qrScanCount || 0}</p>
              </div>
            </div>

            <div className="p-4 bg-at-dark-gray/5 dark:bg-at-dark-surface flex flex-col items-center">
              <img 
                src={product?.productQr?.qrCode} 
                alt={`QR code for ${product?.labelCode || product?.name}`} 
                className="w-48 h-48 p-3 border border-gray-200/60 dark:border-gray-700/40 dark:invert" />
              <p className="text-xs opacity-65 mt-3 break-all text-center">{product?.productQr?.traceUrl}</p>
              <a
                href={qrCodeUrl}
                download={`${product?.labelCode}-qr.png`}
                className="mt-3 inline-flex items-center gap-x-1 px-3 py-2 rounded-lg bg-accent/15 text-accent-dark dark:text-accent text-sm font-medium hover:bg-accent/20 transition duration-200"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download QR
              </a>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
            <div className="mb-2">
              <p className="text-xs opacity-70">Batch Source</p>
              <h3 className="text-md font-semibold font-space-grotesk mt-1">Linked Batch</h3>
            </div>

            <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface flex items-center justify-between gap-x-3">
              <div className="flex items-center gap-x-2">
                <BoxIcon className="w-4 h-4" />
                <p className="text-sm font-semibold">{product?.batch?.name || 'N/A' }</p>
              </div>
              {product?.batch && (
                <Link
                  to={`/producer/batches/batch/${product?.batch?.id}`}
                  className="inline-flex items-center gap-x-1 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-at-dark-gray/40 hover:bg-white dark:hover:bg-at-dark-gray/60 transition duration-200 text-xs font-medium"
                >
                  Open Batch
                  <ArrowIcon className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex gap-x-3">
            <Link
              to="/producer/products"
              className="flex-1 px-4 py-2 rounded-lg bg-at-dark-gray/10 dark:bg-at-dark-surface text-center text-sm font-medium hover:bg-at-dark-gray/20 dark:hover:bg-at-dark-gray/30 transition duration-200 flex items-center justify-center gap-x-1"
            >
              <ArrowIcon className="w-3 h-3 inline-block mr-1 -rotate-180" />
              Back to Products
            </Link>
          </div>
        </div>
      }
    </>
  )
}

export default ProductDetails