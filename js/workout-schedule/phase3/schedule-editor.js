/**
 * ملف تعديل جدول التمارين لصفحة جدول التمارين
 * يحتوي على وظائف تعديل وحفظ جدول التمارين
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن تعديل جدول التمارين
window.workoutScheduleApp.scheduleEditor = {
    // تعديل جدول التمارين
    editSchedule: function() {
        // التحقق من وجود جدول تمارين
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule) {
            window.workoutScheduleApp.ui.showMessage('لا يوجد جدول تمارين للتعديل', 'error');
            return;
        }
        
        // تحميل إعدادات النموذج من الجدول
        this.loadScheduleSettings(schedule);
        
        // التمرير إلى قسم إعدادات الجدول
        document.querySelector('.workout-settings').scrollIntoView({ behavior: 'smooth' });
        
        // عرض رسالة للمستخدم
        window.workoutScheduleApp.ui.showMessage('يمكنك الآن تعديل إعدادات الجدول وإنشاء جدول جديد', 'info');
    },
    
    // تحميل إعدادات النموذج من الجدول
    loadScheduleSettings: function(schedule) {
        // تحديث الهدف المختار
        const goalCards = window.workoutScheduleApp.ui.elements.goalCards;
        goalCards.forEach(card => {
            if (card.getAttribute('data-goal') === schedule.goal) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        // تحديث المستوى
        if (schedule.level) {
            window.workoutScheduleApp.ui.elements.experienceLevel.value = schedule.level;
        }
        
        // تحديث عدد الأيام
        if (schedule.days) {
            window.workoutScheduleApp.ui.elements.daysPerWeek.value = schedule.days;
        }
        
        // تحديث المدة
        if (schedule.duration) {
            window.workoutScheduleApp.ui.elements.workoutDuration.value = schedule.duration;
        }
        
        // تحديث المعدات المختارة
        const equipmentCheckboxes = window.workoutScheduleApp.ui.elements.equipmentCheckboxes;
        equipmentCheckboxes.forEach(checkbox => {
            checkbox.checked = schedule.equipment.includes(checkbox.value);
        });
    },
    
    // حفظ جدول التمارين
    saveSchedule: function() {
        // التحقق من وجود جدول تمارين
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule) {
            window.workoutScheduleApp.ui.showMessage('لا يوجد جدول تمارين للحفظ', 'error');
            return;
        }
        
        // حفظ الجدول في التخزين المحلي
        const success = window.workoutScheduleApp.storageManager.saveSchedule(schedule);
        
        if (success) {
            window.workoutScheduleApp.ui.showMessage('تم حفظ جدول التمارين بنجاح', 'success');
        } else {
            window.workoutScheduleApp.ui.showMessage('حدث خطأ أثناء حفظ جدول التمارين', 'error');
        }
    },
    
    // إعادة ترتيب التمارين في اليوم
    reorderExercises: function(dayName, exerciseIds) {
        // التحقق من وجود جدول تمارين
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule || !schedule.schedule[dayName]) {
            window.workoutScheduleApp.ui.showMessage('لم يتم العثور على اليوم في جدول التمارين', 'error');
            return false;
        }
        
        // الحصول على تمارين اليوم
        const dayExercises = schedule.schedule[dayName].exercises;
        
        // إنشاء مصفوفة جديدة للتمارين بالترتيب الجديد
        const newExercises = [];
        
        // إضافة التمارين بالترتيب الجديد
        exerciseIds.forEach(id => {
            const exercise = dayExercises.find(ex => ex.id === id);
            if (exercise) {
                newExercises.push(exercise);
            }
        });
        
        // التحقق من أن جميع التمارين تم إضافتها
        if (newExercises.length !== dayExercises.length) {
            window.workoutScheduleApp.ui.showMessage('حدث خطأ أثناء إعادة ترتيب التمارين', 'error');
            return false;
        }
        
        // تحديث تمارين اليوم
        schedule.schedule[dayName].exercises = newExercises;
        
        // حفظ التغييرات في التخزين المحلي
        window.workoutScheduleApp.storageManager.saveSchedule(schedule);
        
        // تحديث العرض
        window.workoutScheduleApp.ui.displayWorkoutSchedule();
        
        return true;
    },
    
    // تغيير ترتيب الأيام
    reorderDays: function(dayOrder) {
        // التحقق من وجود جدول تمارين
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule) {
            window.workoutScheduleApp.ui.showMessage('لا يوجد جدول تمارين للتعديل', 'error');
            return false;
        }
        
        // إنشاء كائن جديد للجدول
        const newSchedule = {};
        
        // إضافة الأيام بالترتيب الجديد
        dayOrder.forEach(day => {
            if (schedule.schedule[day]) {
                newSchedule[day] = schedule.schedule[day];
            }
        });
        
        // التحقق من أن جميع الأيام تم إضافتها
        if (Object.keys(newSchedule).length !== Object.keys(schedule.schedule).length) {
            window.workoutScheduleApp.ui.showMessage('حدث خطأ أثناء إعادة ترتيب الأيام', 'error');
            return false;
        }
        
        // تحديث جدول التمارين
        schedule.schedule = newSchedule;
        
        // حفظ التغييرات في التخزين المحلي
        window.workoutScheduleApp.storageManager.saveSchedule(schedule);
        
        // تحديث العرض
        window.workoutScheduleApp.ui.displayWorkoutSchedule();
        
        return true;
    },
    
    // إعادة تسمية اليوم
    renameDay: function(oldDayName, newDayName) {
        // التحقق من وجود جدول تمارين
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule || !schedule.schedule[oldDayName]) {
            window.workoutScheduleApp.ui.showMessage('لم يتم العثور على اليوم في جدول التمارين', 'error');
            return false;
        }
        
        // التحقق من أن الاسم الجديد غير موجود
        if (schedule.schedule[newDayName]) {
            window.workoutScheduleApp.ui.showMessage('يوجد بالفعل يوم بهذا الاسم', 'error');
            return false;
        }
        
        // إنشاء كائن جديد للجدول
        const newSchedule = {};
        
        // نسخ الأيام مع تغيير اسم اليوم المطلوب
        Object.keys(schedule.schedule).forEach(day => {
            if (day === oldDayName) {
                newSchedule[newDayName] = schedule.schedule[day];
            } else {
                newSchedule[day] = schedule.schedule[day];
            }
        });
        
        // تحديث جدول التمارين
        schedule.schedule = newSchedule;
        
        // حفظ التغييرات في التخزين المحلي
        window.workoutScheduleApp.storageManager.saveSchedule(schedule);
        
        // تحديث العرض
        window.workoutScheduleApp.ui.displayWorkoutSchedule();
        
        return true;
    },
    
    // تغيير منطقة التركيز لليوم
    changeDayFocusArea: function(dayName, newFocusArea) {
        // التحقق من وجود جدول تمارين
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule || !schedule.schedule[dayName]) {
            window.workoutScheduleApp.ui.showMessage('لم يتم العثور على اليوم في جدول التمارين', 'error');
            return false;
        }
        
        // تحديث منطقة التركيز
        schedule.schedule[dayName].focusArea = newFocusArea;
        
        // حفظ التغييرات في التخزين المحلي
        window.workoutScheduleApp.storageManager.saveSchedule(schedule);
        
        // تحديث العرض
        window.workoutScheduleApp.ui.displayWorkoutSchedule();
        
        return true;
    }
};
