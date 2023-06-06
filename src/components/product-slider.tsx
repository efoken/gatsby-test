import * as React from 'react'
import * as styles from './product-slider.module.css'

type Props = {
  children?: React.ReactNode
  hasMore?: boolean
  isLoading?: boolean
  onLoadMore?: () => void
  threshold?: number
}

export default function ProductSlider({
  children,
  hasMore = false,
  isLoading = false,
  onLoadMore,
  threshold = 100
}: Props) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const sentinelRef = React.useRef<HTMLDivElement>(null)

  const indicatorRef = React.useRef<HTMLDivElement>(null)
  const indicatorWrapperRef = React.useRef<HTMLDivElement>(null)
  const [indicatorWidth, setIndicatorWidth] = React.useState(0)

  const observer = React.useRef<ResizeObserver>()

  const handleScroll = React.useCallback(() => {
    if (
      !isLoading &&
      hasMore &&
      (sentinelRef.current?.getBoundingClientRect().left ?? 0) -
        (contentRef.current?.clientWidth ?? 0) <
        threshold
    ) {
      onLoadMore?.()
    }
    if (
      contentRef.current &&
      indicatorWrapperRef.current &&
      indicatorRef.current
    ) {
      const nextIndicatorWidth = indicatorWrapperRef.current.clientWidth
      const left = Math.min(
        (contentRef.current.scrollLeft / contentRef.current.scrollWidth) *
          nextIndicatorWidth,
        nextIndicatorWidth - indicatorWidth
      )
      indicatorRef.current.style.left = `${left}px`
    }
  }, [hasMore, indicatorWidth, isLoading, onLoadMore, threshold])

  React.useEffect(() => {
    handleScroll()
  })

  const handleResize = React.useCallback(
    (contentEl: HTMLDivElement, nextIndicatorWidth: number) => {
      handleScroll()
      setIndicatorWidth(
        Math.max(
          (contentEl.clientWidth / contentEl.scrollWidth) * nextIndicatorWidth,
          20
        )
      )
    },
    [handleScroll]
  )

  React.useEffect(() => {
    if (contentRef.current && indicatorWrapperRef.current) {
      const contentEl = contentRef.current
      observer.current = new ResizeObserver(() => {
        handleResize(contentEl, indicatorWrapperRef.current?.clientWidth ?? 0)
      })
      observer.current.observe(contentEl)
      return () => {
        observer.current?.unobserve(contentEl)
      }
    }
    return () => {}
  }, [handleResize])

  return (
    <div className={styles.root}>
      <div ref={contentRef} className={styles.content} onScroll={handleScroll}>
        {children}
        <div ref={sentinelRef} className={styles.sentinel} />
      </div>
      <div ref={indicatorWrapperRef} className={styles.indicatorWrapper}>
        <div
          ref={indicatorRef}
          className={styles.indicator}
          style={{
            width: indicatorWidth
          }}
        />
      </div>
    </div>
  )
}
