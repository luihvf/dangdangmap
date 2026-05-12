import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '댕댕여지도 | 반려견 친화 공간 가이드',
  description: 'PGIS 기반 사용자 참여형 반려견 친화 공간 지도 서비스',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
