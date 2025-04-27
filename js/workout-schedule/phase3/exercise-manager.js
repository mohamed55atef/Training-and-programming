/**
 * ملف إدارة التمارين لصفحة جدول التمارين
 * يحتوي على وظائف إضافة وحذف وعرض التمارين
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};

// كائن إدارة التمارين
window.workoutScheduleApp.exerciseManager = {
    // إضافة تمرين إلى جدول التمارين
    addExerciseToSchedule: function(exerciseId) {
        // التحقق من وجود يوم محدد
        const currentDayEditing = window.workoutScheduleApp.modalManager.currentDayEditing;
        if (!currentDayEditing) {
            window.workoutScheduleApp.ui.showMessage('حدث خطأ: لم يتم تحديد اليوم', 'error');
            return;
        }
        
        // إضافة التمرين إلى الجدول
        const success = window.workoutScheduleApp.scheduleCreator.addExerciseToSchedule(exerciseId, currentDayEditing);
        
        if (success) {
            // تحديث العرض
            window.workoutScheduleApp.ui.displayWorkoutSchedule();
            
            // إغلاق النافذة
            window.workoutScheduleApp.modalManager.closeExerciseModal();
            
            // عرض رسالة نجاح
            window.workoutScheduleApp.ui.showMessage('تم إضافة التمرين بنجاح', 'success');
        } else {
            window.workoutScheduleApp.ui.showMessage('حدث خطأ أثناء إضافة التمرين', 'error');
        }
    },
    
    // حذف تمرين من جدول التمارين
    removeExercise: function(exerciseId, dayName) {
        // عرض رسالة تأكيد
        window.workoutScheduleApp.notificationManager.showConfirmation(
            'هل أنت متأكد من حذف هذا التمرين؟',
            () => {
                // حذف التمرين من الجدول
                const success = window.workoutScheduleApp.scheduleCreator.removeExerciseFromSchedule(exerciseId, dayName);
                
                if (success) {
                    // تحديث العرض
                    window.workoutScheduleApp.ui.displayWorkoutSchedule();
                    
                    // عرض رسالة نجاح
                    window.workoutScheduleApp.ui.showMessage('تم حذف التمرين بنجاح', 'success');
                } else {
                    window.workoutScheduleApp.ui.showMessage('حدث خطأ أثناء حذف التمرين', 'error');
                }
            }
        );
    },
    
    // عرض تفاصيل التمرين
    viewExerciseDetails: function(exerciseId) {
        // البحث عن التمرين
        const exercise = window.workoutScheduleApp.dataLoader.getExerciseById(exerciseId);
        
        if (!exercise) {
            window.workoutScheduleApp.ui.showMessage('لم يتم العثور على معلومات التمرين', 'error');
            return;
        }
        
        // عرض تفاصيل التمرين في نافذة منبثقة
        window.workoutScheduleApp.modalManager.openExerciseDetailsModal(exercise);
    },
    
    // تعديل تفاصيل التمرين
    editExerciseDetails: function(exerciseId, dayName) {
        // البحث عن التمرين في الجدول
        const schedule = window.workoutScheduleApp.scheduleCreator.currentSchedule;
        
        if (!schedule || !schedule.schedule || !schedule.schedule[dayName]) {
            window.workoutScheduleApp.ui.showMessage('لم يتم العثور على اليوم في جدول التمارين', 'error');
            return;
        }
        
        const exercise = schedule.schedule[dayName].exercises.find(ex => ex.id === exerciseId);
        
        if (!exercise) {
            window.workoutScheduleApp.ui.showMessage('لم يتم العثور على التمرين في اليوم', 'error');
            return;
        }
        
        // إنشاء نافذة تعديل التمرين
        const modalHTML = `
            <div class="modal exercise-edit-modal" id="exercise-edit-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">تعديل تفاصيل التمرين</h2>
                        <button class="modal-close" id="edit-modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="edit-exercise-sets">عدد المجموعات:</label>
                            <input type="number" id="edit-exercise-sets" class="form-control" value="${exercise.sets}" min="1" max="10">
                        </div>
                        <div class="form-group">
                            <label for="edit-exercise-reps">عدد التكرارات:</label>
                            <input type="text" id="edit-exercise-reps" class="form-control" value="${exercise.reps}">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" id="save-exercise-btn">حفظ</button>
                        <button class="btn btn-secondary" id="edit-modal-close-btn">إلغاء</button>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة النافذة إلى الصفحة
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // الحصول على عناصر النافذة
        const editModal = document.getElementById('exercise-edit-modal');
        const editModalClose = document.getElementById('edit-modal-close');
        const editModalCloseBtn = document.getElementById('edit-modal-close-btn');
        const saveExerciseBtn = document.getElementById('save-exercise-btn');
        
        // فتح النافذة
        editModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // إضافة مستمعي الأحداث للنافذة
        editModalClose.addEventListener('click', () => {
            this.closeEditModal(editModal);
        });
        
        editModalCloseBtn.addEventListener('click', () => {
            this.closeEditModal(editModal);
        });
        
        // إغلاق النافذة عند النقر خارجها
        editModal.addEventListener('click', (event) => {
            if (event.target === editModal) {
                this.closeEditModal(editModal);
            }
        });
        
        // حفظ التغييرات
        saveExerciseBtn.addEventListener('click', () => {
            const sets = parseInt(document.getElementById('edit-exercise-sets').value);
            const reps = document.getElementById('edit-exercise-reps').value;
            
            // التحقق من صحة البيانات
            if (isNaN(sets) || sets < 1) {
                window.workoutScheduleApp.ui.showMessage('يرجى إدخال عدد مجموعات صحيح', 'error');
                return;
            }
            
            if (!reps) {
                window.workoutScheduleApp.ui.showMessage('يرجى إدخال عدد تكرارات', 'error');
                return;
            }
            
            // تحديث التمرين
            exercise.sets = sets;
            exercise.reps = reps;
            
            // حفظ التغييرات في التخزين المحلي
            window.workoutScheduleApp.storageManager.saveSchedule(schedule);
            
            // تحديث العرض
            window.workoutScheduleApp.ui.displayWorkoutSchedule();
            
            // إغلاق النافذة
            this.closeEditModal(editModal);
            
            // عرض رسالة نجاح
            window.workoutScheduleApp.ui.showMessage('تم تحديث التمرين بنجاح', 'success');
        });
    },
    
    // إغلاق نافذة تعديل التمرين
    closeEditModal: function(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // إزالة النافذة من الصفحة بعد انتهاء الرسوم المتحركة
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
};
