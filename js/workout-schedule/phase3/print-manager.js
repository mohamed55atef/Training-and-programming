/**
 * ملف إدارة الطباعة لصفحة جدول التمارين
 * يحتوي على وظائف طباعة جدول التمارين
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن إدارة الطباعة
window.workoutScheduleApp.printManager = {
    // طباعة جدول التمارين
    printSchedule: function() {
        // التحقق من وجود جدول تمارين
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule) {
            window.workoutScheduleApp.ui.showMessage('لا يوجد جدول تمارين للطباعة', 'error');
            return;
        }
        
        // إنشاء نافذة طباعة
        const printWindow = window.open('', '_blank');
        
        // إنشاء محتوى الطباعة
        const printContent = this.createPrintContent(schedule);
        
        // كتابة المحتوى في نافذة الطباعة
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        // طباعة النافذة
        printWindow.onload = function() {
            printWindow.print();
            printWindow.onafterprint = function() {
                printWindow.close();
            };
        };
    },
    
    // إنشاء محتوى الطباعة
    createPrintContent: function(schedule) {
        // الحصول على التاريخ الحالي
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('ar-EG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // إنشاء رأس الصفحة
        let content = `
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>جدول التمارين - تغذية ولياقة</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        padding: 20px;
                    }
                    
                    .print-header {
                        text-align: center;
                        margin-bottom: 20px;
                        padding-bottom: 10px;
                        border-bottom: 2px solid #333;
                    }
                    
                    .print-title {
                        font-size: 24px;
                        margin: 0;
                    }
                    
                    .print-date {
                        font-size: 14px;
                        color: #666;
                    }
                    
                    .schedule-info {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        padding: 10px;
                        background-color: #f5f5f5;
                        border-radius: 5px;
                    }
                    
                    .info-item {
                        margin: 0 10px;
                    }
                    
                    .info-label {
                        font-weight: bold;
                    }
                    
                    .workout-day {
                        margin-bottom: 20px;
                        page-break-inside: avoid;
                    }
                    
                    .day-header {
                        background-color: #f5f5f5;
                        padding: 10px;
                        border-radius: 5px;
                        margin-bottom: 10px;
                    }
                    
                    .day-title {
                        margin: 0;
                        font-size: 18px;
                    }
                    
                    .exercise-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                    }
                    
                    .exercise-name {
                        font-weight: bold;
                        margin: 0;
                    }
                    
                    .exercise-details {
                        color: #666;
                        font-size: 14px;
                    }
                    
                    .exercise-sets-reps {
                        text-align: center;
                    }
                    
                    .sets, .reps {
                        display: block;
                    }
                    
                    .print-footer {
                        text-align: center;
                        margin-top: 20px;
                        padding-top: 10px;
                        border-top: 1px solid #eee;
                        font-size: 12px;
                        color: #666;
                    }
                    
                    @media print {
                        body {
                            padding: 0;
                        }
                        
                        .workout-day {
                            page-break-inside: avoid;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <h1 class="print-title">جدول التمارين الأسبوعي - تغذية ولياقة</h1>
                    <p class="print-date">${formattedDate}</p>
                </div>
                
                <div class="schedule-info">
                    <div class="info-item">
                        <span class="info-label">الهدف:</span>
                        <span class="info-value">${window.workoutScheduleApp.utils.getGoalName(schedule.goal)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">المستوى:</span>
                        <span class="info-value">${window.workoutScheduleApp.utils.getLevelName(schedule.level)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">عدد الأيام:</span>
                        <span class="info-value">${schedule.days} أيام</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">المدة:</span>
                        <span class="info-value">${schedule.duration} دقيقة</span>
                    </div>
                </div>
        `;
        
        // إضافة أيام التمرين
        Object.keys(schedule.schedule).forEach(dayName => {
            const day = schedule.schedule[dayName];
            
            content += `
                <div class="workout-day">
                    <div class="day-header">
                        <h2 class="day-title">${dayName} - ${day.focusArea}</h2>
                    </div>
                    <div class="exercises-list">
            `;
            
            if (day.exercises && day.exercises.length > 0) {
                day.exercises.forEach(exercise => {
                    content += `
                        <div class="exercise-item">
                            <div class="exercise-info">
                                <h3 class="exercise-name">${exercise.name}</h3>
                                <div class="exercise-details">
                                    <span class="exercise-muscle">${window.workoutScheduleApp.utils.getMuscleNameArabic(exercise.muscle)}</span> - 
                                    <span class="exercise-equipment">${window.workoutScheduleApp.utils.getEquipmentNameArabic(exercise.equipment)}</span>
                                </div>
                            </div>
                            <div class="exercise-sets-reps">
                                <span class="sets">${exercise.sets} مجموعات</span>
                                <span class="reps">${exercise.reps} تكرار</span>
                            </div>
                        </div>
                    `;
                });
            } else {
                content += `
                    <div class="no-exercises">
                        <p>لا توجد تمارين مضافة لهذا اليوم</p>
                    </div>
                `;
            }
            
            content += `
                    </div>
                </div>
            `;
        });
        
        // إضافة تذييل الصفحة
        content += `
                <div class="print-footer">
                    <p>تم إنشاء هذا الجدول بواسطة موقع تغذية ولياقة - www.nutrition-gym.com</p>
                </div>
            </body>
            </html>
        `;
        
        return content;
    },
    
    // تصدير جدول التمارين كملف PDF
    exportToPDF: function() {
        // التحقق من وجود جدول تمارين
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule) {
            window.workoutScheduleApp.ui.showMessage('لا يوجد جدول تمارين للتصدير', 'error');
            return;
        }
        
        // عرض رسالة للمستخدم
        window.workoutScheduleApp.ui.showMessage('جاري تصدير جدول التمارين كملف PDF...', 'info');
        
        // استخدام طريقة الطباعة لتصدير الملف
        this.printSchedule();
    },
    
    // تصدير جدول التمارين كملف JSON
    exportToJSON: function() {
        // التحقق من وجود جدول تمارين
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule) {
            window.workoutScheduleApp.ui.showMessage('لا يوجد جدول تمارين للتصدير', 'error');
            return;
        }
        
        // تحويل الجدول إلى نص JSON
        const jsonString = JSON.stringify(schedule, null, 2);
        
        // إنشاء رابط تنزيل
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // إنشاء عنصر رابط وتنزيل الملف
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workout-schedule.json';
        document.body.appendChild(a);
        a.click();
        
        // تنظيف
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
        
        // عرض رسالة للمستخدم
        window.workoutScheduleApp.ui.showMessage('تم تصدير جدول التمارين بنجاح', 'success');
    }
};
