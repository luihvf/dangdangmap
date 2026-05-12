# 🐾 댕댕여지도 (DangDangMap)

PGIS 기반 사용자 참여형 반려견 친화 공간 가이드 웹앱

## GitHub Pages 배포 방법

1. 이 폴더를 GitHub 레포에 push
2. GitHub → Settings → Pages → Source를 **GitHub Actions**로 선택
3. push하면 자동으로 빌드 & 배포됩니다

`https://<username>.github.io/<repo-name>/` 에서 확인 가능

## 로컬 실행

```bash
npm install
npm run dev
```

## 기술 스택
- Next.js 14 (Static Export) + TypeScript
- Tailwind CSS
- MapLibre GL + react-map-gl
