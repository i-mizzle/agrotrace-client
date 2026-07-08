import { getBatchById } from "../../../pages/user/producer/batches/batchMockData";
import { productCategoryColorMap } from "../../../pages/user/producer/products/productMockData";
import { unSlugify } from "../../../utils/utils";
import { Link } from "react-router-dom";
import ArrowIcon from "../icons/ArrowIcon";
import BoxIcon from "../icons/BoxIcon";
import CalendarIcon from "../icons/CalendarIcon";

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
          <p className="text-sm font-semibold font-space-grotesk">{product.name} {product.labelCode && <span className="text-xs opacity-70 mt-1">({product.labelCode})</span>}</p>
          <p className="text-xs opacity-70 mt-1">From {product?.sourceAsset?.name}</p>
        </div>
        <ArrowIcon className="w-4 h-4 mt-0.5 opacity-60" />
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <span className={`text-[10px] px-2 py-1 rounded-full ${categoryColors.bg} ${categoryColors.text} capitalize`}>
          {unSlugify(product.category)}
        </span>
        <span className="text-[10px] px-2 py-1 rounded-full bg-at-dark-gray/10 dark:bg-at-dark-surface capitalize">
          {unSlugify(product.type)}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-2">
        <div className="p-1.5 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
          <p className="text-[11px] opacity-60">Quantity</p>
          <p className="text-sm font-semibold mt-0.5">{product.quantity.amount} {product.quantity.unit}</p>
        </div>
        {/* <div className="p-2.5 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
          <p className="text-[11px] opacity-60">QR Scans</p>
          <p className="text-sm font-semibold mt-0.5">{product.qrScanCount}</p>
        </div> */}
      </div>

      {batch && <div className="mt-3 flex items-center gap-x-1 text-xs opacity-75">
        <BoxIcon className="w-3.5 h-3.5" />
        <span>Batch: {batch?.batchCode || product.batch}</span>
      </div>}

      {/* <div className="mt-2 flex items-center gap-x-1 text-xs opacity-70">
        <CalendarIcon className="w-3.5 h-3.5" />
        <span>Updated {new Date(product.updatedAt).toLocaleDateString()}</span>
      </div> */}
    </Link>
  )
}

export default ProductCard