import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import BoxIcon from '../../../../components/elements/icons/BoxIcon'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import { getBatchById } from '../batches/batchMockData'
import { placeholderProducts, productCategoryColorMap } from './productMockData'
import { unSlugify } from '../../../../utils/utils'
import ProductCard from '../../../../components/elements/products/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../../store/actions/productsActions';
import Loader from '../../../../components/elements/Loader';
import EmptyState from '../../../../components/elements/EmptyState';
import ErrorState from '../../../../components/elements/ErrorState';


const Products = () => {
  // const products = [...placeholderProducts].sort((firstProduct, secondProduct) => new Date(secondProduct.updatedAt) - new Date(firstProduct.updatedAt))
  // const wholeBatchCount = products.filter((item) => item.wholeBatch).length
  // const totalScans = products.reduce((sum, item) => sum + (item.qrScanCount || 0), 0)

  const dispatch = useDispatch()
  const productsSelector = useSelector((state) => state.products)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)
  const [filters, setFilters] = useState(``)

  useEffect(() => {
    dispatch(fetchProducts(filters, page, perPage))
  }, [dispatch, filters, page, perPage])

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
        {productsSelector?.loadingProducts 
        ? 
          <Loader />
        :
        productsSelector?.products?.products?.length === 0 
        ? 
          <EmptyState /> 
        : 
        productsSelector?.productsError 
        ?
          <ErrorState />  
        :
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {productsSelector?.products?.products?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Products