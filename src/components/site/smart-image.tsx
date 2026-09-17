'use client'

import Image from 'next/image'
import { useContent } from '@/components/site/content-provider'

type SmartImageProps = {
  src: string
  alt: string
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
}

/** Imagem que aceita conteúdo do admin: "ref:img:<id>" (via /api/img) usa
 *  unoptimized; caminhos estáticos seguem pelo otimizador padrão. */
export function SmartImage({ src, alt, fill, sizes, className, priority, width, height }: SmartImageProps) {
  const { resolveImage } = useContent()
  const resolved = resolveImage(src)
  const dynamic = resolved.startsWith('/api/img/')
  return (
    <Image
      src={resolved}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      width={width}
      height={height}
      unoptimized={dynamic}
    />
  )
}
