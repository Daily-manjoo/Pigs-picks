# 먹어도 먹어도 또 먹고 싶은 먹방 집합소 🍚
![image](https://github.com/user-attachments/assets/fda2b96b-8a9c-4580-9056-c0972bed0e27)


<br/>

## 프로젝트 소개
* Pigs-picks는 미각에 진심인 사람들이 자신만의 맛집 로드맵을 공유하고 탐색할 수 있는 커뮤니티 플랫폼입니다.
* 유저들이 직접 방문한 맛집의 정보를 댓글을 통해 공유합니다.
* 업종별 필터링 및 지도 기반 검색 기능을 통해 취향에 맞는 맛집을 쉽게 찾을 수 있습니다.
* 위치와 키워드를 통해 맛집을 탐색하고, 나만의 맛집 리스트를 저장하여 관리할 수 있는 기능을 제공합니다.

<br/>

## 🖥️ Tech Stack

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <!-- Next.js: #000000 -->
<img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white"/> <!-- Prisma: #2D3748 -->
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/> <!-- Typescript: #3178C6 -->
<img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=recoil&logoColor=white"/> <!-- Recoil: #3578E5 -->
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white"/> <!-- Supabase: #3ECF8E -->
<img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=react-query&logoColor=white"/> <!-- React Query: #FF4154 -->
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/> <!-- Tailwind CSS: #06B6D4 -->
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/> <!-- Vercel: #000000 -->

<br/>

## Trouble Shooting

<details>
  <summary> 가게 상세 페이지에서 윈도우를 나가고 재진입하면 가게 데이터가 refetch됨 </summary>

  - window focus 속성을 사용해 값을 바꿔줘야 함
  - useQuery함수의 refetchOnWindowFocus 값을 false로 넣어주니 불필요한 refetch가 해결
  
</details>

<details>
  <summary> 새로운 데이터 추가 시 카카오맵만 나오고 가게 DB가 불러와지지 않는 현상 </summary>

  - supabase를 확인해보니 데이터를 덮어쓰는 과정에서 이전 가게 데이터 시드들이 모두 초기화됨
  - 처음 세팅할 때 json 형식으로 돼있던 파일을 다시 npx prisma migrate dev 명령어를 통해 seed로 심었더니 가게 리스트가 다시 보이고 supabase에도 잘 추가됨
  
</details>

<br/>

## 프로젝트 구조
```
📦 Pigs-picks
├─ .eslintrc.json
├─ .gitignore
├─ README.md
├─ next-auth.d.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ prisma
│  ├─ migrations
│  │  ├─ 20240225142129_init
│  │  │  └─ migration.sql
│  │  ├─ 20240303152027_next_auth
│  │  │  └─ migration.sql
│  │  ├─ 20240307114319_name_optional
│  │  │  └─ migration.sql
│  │  ├─ 20240308131931_token_expires_int_optional
│  │  │  └─ migration.sql
│  │  ├─ 20240420071411_add_like_model
│  │  │  └─ migration.sql
│  │  ├─ 20240427135109_add_like_edit_model
│  │  │  └─ migration.sql
│  │  ├─ 20240518141239_create_comment_model
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  ├─ schema.prisma
│  └─ seed.ts
├─ public
│  ├─ favicon.ico
│  ├─ images
│  │  └─ markers
│  │     ├─ default.png
│  │     ├─ 동남아.png
│  │     ├─ 베이커리.png
│  │     ├─ 복어취급.png
│  │     ├─ 분식.png
│  │     ├─ 술집.png
│  │     ├─ 양식.png
│  │     ├─ 인도_중동.png
│  │     ├─ 일식.png
│  │     ├─ 중국식.png
│  │     ├─ 카페.png
│  │     ├─ 탕류.png
│  │     └─ 한식.png
│  ├─ next.svg
│  └─ vercel.svg
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ [...nextauth]
│  │  │  │     └─ route.ts
│  │  │  └─ stores
│  │  │     └─ route.ts
│  │  ├─ global-error.tsx
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ providers.tsx
│  │  ├─ stores
│  │  │  ├─ [id]
│  │  │  │  ├─ edit
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ new
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  └─ users
│  │     ├─ likes
│  │     │  └─ page.tsx
│  │     ├─ login
│  │     │  └─ page.tsx
│  │     └─ mypage
│  │        └─ page.tsx
│  ├─ atom
│  │  └─ index.ts
│  ├─ components
│  │  ├─ AddressSearch.tsx
│  │  ├─ CurrentLocationButton.tsx
│  │  ├─ FullPageLoader.tsx
│  │  ├─ Layout.tsx
│  │  ├─ Like.tsx
│  │  ├─ Loader.tsx
│  │  ├─ Loading.tsx
│  │  ├─ Map.tsx
│  │  ├─ Marker.tsx
│  │  ├─ Markers.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ Pagination.tsx
│  │  ├─ SearchFilter.tsx
│  │  ├─ StoreBox.tsx
│  │  ├─ StoreList.tsx
│  │  └─ comments
│  │     ├─ CommentForm.tsx
│  │     ├─ CommentList.tsx
│  │     └─ index.tsx
│  ├─ data
│  │  ├─ store.ts
│  │  └─ store_data.json
│  ├─ db
│  │  └─ index.ts
│  ├─ hooks
│  │  └─ useIntersectionObserver.ts
│  ├─ interface
│  │  └─ index.ts
│  ├─ middleware.ts
│  ├─ pages
│  │  └─ api
│  │     ├─ comments.ts
│  │     └─ likes.ts
│  └─ styles
│     └─ globals.css
├─ tailwind.config.js
├─ tailwind.config.ts
├─ tsconfig.json
└─ yarn.lock
```
©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)
