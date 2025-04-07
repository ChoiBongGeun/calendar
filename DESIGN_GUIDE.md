# 일일 계획 관리 앱 디자인 가이드

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
```css
.react-calendar__tile {
  max-width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  text-align: center;
  line-height: 16px;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  padding: 0;
}

/* 오늘 날짜 */
.react-calendar__tile--now {
  background: linear-gradient(to right, #fef3c7, #fef9c3);
  color: #92400e;
  font-weight: bold;
}

/* 선택된 날짜 */
.react-calendar__tile--active {
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

## 시간 입력 필드 스타일
```css
.input[type="time"] {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 0.5rem;
  text-align: center;
}

.input[type="time"]::-webkit-datetime-edit-hour-field,
.input[type="time"]::-webkit-datetime-edit-minute-field,
.input[type="time"]::-webkit-datetime-edit-ampm-field {
  padding: 0;
  margin: 0;
}
```

## 반응형 디자인 브레이크포인트

- 모바일: < 1024px
- 데스크톱: >= 1024px

### 주요 변경사항
1. 모바일에서는 입력 폼 대신 + 버튼만 표시
2. 모바일에서 + 버튼 클릭 시 입력 모달 표시
3. 데스크톱에서는 입력 폼 표시
4. 달력은 모바일에서 최대 400px, 데스크톱에서 고정 400px

## 컬러 팔레트

- 배경 그라데이션: `from-blue-50 to-white`
- 기본 텍스트: `text-gray-800`
- 보조 텍스트: `text-gray-700`, `text-gray-500`
- 버튼 색상: Tailwind의 기본 색상 시스템 사용
- 달력 하이라이트:
  - 오늘: 노란색 계열 그라데이션
  - 선택: 파란색 계열 그라데이션 