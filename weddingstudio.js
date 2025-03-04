document.addEventListener('DOMContentLoaded', function () {
    const draggables = document.querySelectorAll('.draggable');
    const dropZone = document.getElementById('drop-zone');

    draggables.forEach(item => {
        item.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', event.target.id);
        });
    });

    dropZone.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    dropZone.addEventListener('drop', function (event) {
        event.preventDefault();
        const draggedId = event.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(draggedId);
        if (draggedElement) {
            dropZone.appendChild(draggedElement.cloneNode(true));
        }
    });
});

