# 일일 계획 관리 앱 디자인 가이드

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

### 컴포넌트 스타일

#### 버튼
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

#### 입력 필드
```css
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 focus:ring-blue-500 
         focus:border-transparent transition-all duration-200;
}
```

#### 체크박스
```css
.checkbox {
  @apply h-5 w-5 text-blue-600 rounded border-gray-300 
         focus:ring-blue-500 transition-all duration-200;
}
```

#### 시간 태그
```css
.time-tag {
  @apply px-2 py-1 text-xs bg-blue-100 text-blue-800 
         rounded-full font-medium;
}
```

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

## 애니메이션
- **테마 전환**: `transition-colors duration-500`
- **버튼 호버**: `transition-all duration-200`
- **모달**: `transition-transform duration-300`
- **알림**: `transform hover:scale-110`

## 접근성
- 적절한 색상 대비
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 포커스 상태 시각적 표시

## 레이아웃 구조

### 메인 레이아웃 (`src/app/page.tsx`)
```tsx
<main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
  <div className="container mx-auto px-4 py-8 max-w-6xl">
    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
      일일 계획 관리
    </h1>
    
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-[400px] mx-auto lg:mx-0">
        <DatePicker />
      </div>
      <div className="flex-1">
        <DailyPlanner />
      </div>
    </div>
  </div>
</main>
```

### 할일 관리 컴포넌트 (`src/components/DailyPlanner.tsx`)
```tsx
<div className="bg-white rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">할일 목록</h2>
  
  {/* 데스크톱 입력 폼 */}
  <div className="hidden lg:flex gap-2 items-center mb-6">
    <input className="input flex-1" />
    <input type="time" className="input w-32" />
    <button className="btn btn-primary p-2" />
  </div>

  {/* 모바일 추가 버튼 */}
  <div className="lg:hidden flex justify-end mb-6">
    <button className="btn btn-primary p-2" />
  </div>

  {/* 할일 목록 */}
  <div className="space-y-4">
    {/* 할일 카드들 */}
  </div>
</div>
```

## 캘린더 스타일 (`src/app/globals.css`)

### 기본 스타일
```css
.react-calendar {
  width: 100%;
  max-width: 100%;
  background: white;
  border: none;
  font-family: inherit;
  line-height: 1.125em;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  max-height: 500px;
}

/* 모바일 대응 */
@media (max-width: 1024px) {
  .react-calendar {
    max-width: 400px;
    margin: 0 auto;
  }
}
```

### 내비게이션 스타일
```css
.react-calendar__navigation {
  display: flex;
  height: 44px;
  margin-bottom: 1em;
  background: linear-gradient(to right, #f3f4f6, #e5e7eb);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.react-calendar__navigation button {
  min-width: 44px;
  background: none;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 600;
  color: #4b5563;
  transition: all 0.2s ease;
}
```

### 달력 타일 스타일
```