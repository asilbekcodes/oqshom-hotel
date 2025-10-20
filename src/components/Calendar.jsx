"use client"

import { useState } from "react"

export function CalendarModal({ isOpen, onClose, dateRange, onDateRangeSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)) // July 2025

  const monthNames = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ]

  const dayNames = ["dush", "Sesh", "Chor", "Pay", "Ju", "Shan", "Yak"]

  if (!isOpen) return null

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getNextMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1)
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isDateInRange = (date) => {
    if (!dateRange.startDate || !dateRange.endDate) return false
    return date >= dateRange.startDate && date <= dateRange.endDate
  }

  const isStartDate = (date) => {
    if (!dateRange.startDate) return false
    return date.toDateString() === dateRange.startDate.toDateString()
  }

  const isEndDate = (date) => {
    if (!dateRange.endDate) return false
    return date.toDateString() === dateRange.endDate.toDateString()
  }

  const handleDateClick = (date) => {
    // Disable past dates
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return

    if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      // Start new selection
      onDateRangeSelect({ startDate: date, endDate: null })
    } else if (dateRange.startDate && !dateRange.endDate) {
      // Complete the range
      if (date < dateRange.startDate) {
        // If clicked date is before start date, make it the new start date
        onDateRangeSelect({ startDate: date, endDate: dateRange.startDate })
      } else if (date.getTime() === dateRange.startDate.getTime()) {
        // If clicked on the same date, reset
        onDateRangeSelect({ startDate: null, endDate: null })
      } else {
        // Normal case: set as end date
        onDateRangeSelect({ startDate: dateRange.startDate, endDate: date })
      }

      // Close modal after selecting end date
      setTimeout(() => {
        onClose()
      }, 300)
    }
  }

  const getDateButtonClass = (date) => {
    const baseClass =
      "w-full h-full flex flex-col items-center justify-center text-xs border rounded hover:bg-orange-50 transition-colors"

    // Disable past dates
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const isDisabled = date < today

    if (isDisabled) {
      return `${baseClass} bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100`
    }

    if (isStartDate(date) || isEndDate(date)) {
      return `${baseClass} bg-orange-500 text-white border-orange-500`
    } else if (isDateInRange(date)) {
      return `${baseClass} bg-orange-100 border-orange-200`
    } else {
      return `${baseClass} border-gray-200 hover:border-orange-300`
    }
  }

  const renderCalendar = (date) => {
    const days = getDaysInMonth(date)
    const monthName = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return (
      <div className="flex-1">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">
            {year} yil {monthName}
          </h3>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day, index) => (
            <div
              key={day}
              className={`text-center text-xs font-medium p-2 ${index >= 5 ? "text-orange-500" : "text-gray-500"}`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div key={index} className="aspect-square">
              {day ? (
                <button
                  onClick={() => handleDateClick(day)}
                  className={getDateButtonClass(day)}
                  disabled={day < new Date()}
                >
                  <span className="font-medium">{day.getDate()}</span>
                  <span
                    className={`text-xs ${
                      isDateInRange(day) || isStartDate(day) || isEndDate(day) ? "text-white" : "text-gray-600"
                    }`}
                  >
                    650 000
                  </span>
                  <span
                    className={`text-xs ${
                      isDateInRange(day) || isStartDate(day) || isEndDate(day) ? "text-white" : "text-gray-500"
                    }`}
                  >
                    so'm
                  </span>
                </button>
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const getInstructionText = () => {
    if (!dateRange.startDate) {
      return "Kirish sanasini tanlang"
    } else if (!dateRange.endDate) {
      return "Chiqish sanasini tanlang"
    } else {
      const nights = Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24))
      return `${nights} kecha tanlandi`
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{getInstructionText()}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="p-6">
          <div className="flex gap-8">
            {renderCalendar(currentDate)}
            {renderCalendar(getNextMonth(currentDate))}
          </div>

          {dateRange.startDate && dateRange.endDate && (
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold mb-2">
                Ro'yxatdan o'tish {dateRange.startDate.getDate()} {monthNames[dateRange.startDate.getMonth()]} - Chiqish{" "}
                {dateRange.endDate.getDate()} {monthNames[dateRange.endDate.getMonth()]}
              </h4>
              <p className="text-sm text-gray-600">Kechasi 1 mehmon uchun eng yaxshi narxlar</p>
              <p className="text-sm text-gray-600">Narx maxsus bronlash shartlarga muvofiq bo'lishi mumkin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
