/**
 * ملف JavaScript الرئيسي لصفحة جدول التمارين
 * يقوم باستدعاء الملفات الفرعية
 */

// المرحلة الأولى: البيانات والتحميل
document.write('<script src="../js/workout-schedule/phase1/data-loader.js"></script>');
document.write('<script src="../js/workout-schedule/phase1/exercise-filter.js"></script>');
document.write('<script src="../js/workout-schedule/phase1/schedule-creator.js"></script>');
document.write('<script src="../js/workout-schedule/phase1/storage-manager.js"></script>');
document.write('<script src="../js/workout-schedule/phase1/utils.js"></script>');

// المرحلة الثانية: واجهة المستخدم
document.write('<script src="../js/workout-schedule/phase2/ui-renderer.js"></script>');
document.write('<script src="../js/workout-schedule/phase2/modal-manager.js"></script>');
document.write('<script src="../js/workout-schedule/phase2/form-handler.js"></script>');
document.write('<script src="../js/workout-schedule/phase2/notification-manager.js"></script>');
document.write('<script src="../js/workout-schedule/phase2/animation-manager.js"></script>');

// المرحلة الثالثة: التفاعلات والأحداث
document.write('<script src="../js/workout-schedule/phase3/event-listeners.js"></script>');
document.write('<script src="../js/workout-schedule/phase3/exercise-manager.js"></script>');
document.write('<script src="../js/workout-schedule/phase3/schedule-editor.js"></script>');
document.write('<script src="../js/workout-schedule/phase3/print-manager.js"></script>');
document.write('<script src="../js/workout-schedule/phase3/app-initializer.js"></script>');
