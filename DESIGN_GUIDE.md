# 디자인 가이드

## 디자인 시스템

### 컬러 팔레트

#### 라이트 모드
- **배경**: `from-blue-50 to-white` (그라데이션)
- **기본 텍스트**: `text-gray-800`
- **보조 텍스트**: `text-gray-700`, `text-gray-500`
- **버튼 기본**: `bg-gray-200`
- **버튼 호버**: `hover:bg-gray-300`
- **입력 필드**: `bg-white`, `border-gray-300`
- **포커스**: `ring-blue-500`

#### 다크 모드
- **배경**: `from-gray-900 to-gray-800` (그라데이션)
- **기본 텍스트**: `text-white`
- **보조 텍스트**: `text-gray-300`
- **버튼 기본**: `bg-gray-700`
- **버튼 호버**: `hover:bg-gray-600`
- **입력 필드**: `bg-gray-700`, `border-gray-600`
- **포커스**: `ring-blue-500`

### 타이포그래피
- **제목**: `text-4xl font-bold`
- **부제목**: `text-xl font-semibold`
- **본문**: `text-base`
- **작은 텍스트**: `text-sm`

---

## 컴포넌트 스타일

### 버튼
```css
.btn {
  @apply px-4 py-2 rounded-xl shadow hover:shadow-md transition-all duration-200;
}

.btn-primary {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.btn-danger {
  @apply bg-red-500 text-white hover:bg-red-600;
}
```

### 입력 필드
```css
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 focus:ring-blue-500 
         focus:border-transparent transition-all duration-200;
}
```

### 체크박스
```css
.checkbox {
  @apply h-5 w-5 text-blue-600 rounded border-gray-300 
         focus:ring-blue-500 transition-all duration-200;
}
```

### 시간 태그
```css
.time-tag {
  @apply px-2 py-1 text-xs bg-blue-100 text-blue-800 
         rounded-full font-medium;
}
```

---

## 레이아웃 구조

### 메인 레이아웃
- **최대 너비**: `max-w-6xl`
- **패딩**: `px-4 py-8`
- **그리드**: `flex flex-col lg:flex-row gap-8`
- **캘린더 너비**: `w-full lg:w-[400px]`
- **플래너 너비**: `flex-1`

### 반응형 디자인
- **모바일**: < 1024px
- **데스크톱**: >= 1024px

#### 모바일 최적화
- 캘린더 최대 너비: 400px
- 입력 폼 대신 + 버튼 사용
- 모달 기반 입력 인터페이스

#### 데스크톱 최적화
- 고정된 캘린더 너비 (400px)
- 인라인 입력 폼
- 확장된 레이아웃

---

## 애니메이션
- **테마 전환**: `transition-colors duration-500`
- **버튼 호버**: `transition-all duration-200`
- **모달**: `transition-transform duration-300`
- **알림**: `transform hover:scale-110`

---

## 접근성
- 적절한 색상 대비
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 포커스 상태 시각적 표시

---

## 마크다운 스타일

- 마크다운 미리보기는 `react-markdown` + `remark-gfm` 사용
- `prose dark:prose-invert` 스타일 적용
- 리스트, 헤딩, 링크, 코드블럭 등 지원
