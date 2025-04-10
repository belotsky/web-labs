class StudentManager {
    constructor() {
        this.students = [];
        this.nextId = 1;
        this.history = [];
        this.loadFromStorage();
        this.initializeEventListeners();
        this.updateTable();
        this.updateIdSelect();
        this.updateHistory();
    }

    loadFromStorage() {
        const storedData = localStorage.getItem('students');
        const storedHistory = localStorage.getItem('history');
        if (storedData) {
            this.students = JSON.parse(storedData);
            this.nextId = Math.max(...this.students.map(s => s.id), 0) + 1;
        }
        if (storedHistory) {
            this.history = JSON.parse(storedHistory);
        }
    }

    saveToStorage() {
        localStorage.setItem('students', JSON.stringify(this.students));
        localStorage.setItem('history', JSON.stringify(this.history));
    }

    addToHistory(action, studentId, details = '') {
        const timestamp = new Date().toLocaleString();
        const historyItem = {
            timestamp,
            action,
            studentId,
            details
        };
        this.history.unshift(historyItem);
        this.saveToStorage();
        this.updateHistory();
    }

    updateHistory() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = `[${item.timestamp}] ${item.action} ${item.details}`;
            historyList.appendChild(historyItem);
        });
    }

    initializeEventListeners() {
        document.getElementById('addStudent').addEventListener('click', () => this.addStudent());
        document.getElementById('clearForm').addEventListener('click', () => this.clearForm());
        document.getElementById('deleteStudent').addEventListener('click', () => this.deleteStudent());
        document.getElementById('addProperty').addEventListener('click', () => this.addProperty());
        document.getElementById('removeProperty').addEventListener('click', () => this.removeProperty());
        document.getElementById('showNonOlympiad').addEventListener('click', () => this.showNonOlympiadStudents());
    }

    addStudent() {
        const student = {
            id: this.nextId++,
            fullName: document.getElementById('fullName').value,
            address: document.getElementById('address').value,
            grade: document.getElementById('grade').value,
            olympiad: document.getElementById('olympiad').value === 'true',
            additionalProperties: {}
        };

        this.students.push(student);
        this.addToHistory('Добавлена новая запись', student.id, `ФИО: ${student.fullName}`);
        this.saveToStorage();
        this.updateTable();
        this.updateIdSelect();
        this.clearForm();
    }

    clearForm() {
        document.getElementById('studentForm').reset();
    }

    deleteStudent() {
        const id = document.getElementById('studentId').value;
        if (id) {
            const student = this.students.find(s => s.id === parseInt(id));
            if (student) {
                this.addToHistory('Удалена запись', student.id, `ФИО: ${student.fullName}`);
                this.students = this.students.filter(student => student.id !== parseInt(id));
                this.saveToStorage();
                this.updateTable();
                this.updateIdSelect();
                this.clearForm();
            }
        }
    }

    addProperty() {
        const propertyName = document.getElementById('newProperty').value;
        const propertyValue = document.getElementById('newPropertyValue').value;
        const selectedId = document.getElementById('studentId').value;

        if (propertyName && propertyValue && selectedId) {
            const student = this.students.find(s => s.id === parseInt(selectedId));
            if (student) {
                student.additionalProperties[propertyName] = propertyValue;
                this.addToHistory('Добавлено свойство', student.id, `${propertyName}: ${propertyValue}`);
                this.saveToStorage();
                this.updateTable();
            }
        }
    }

    removeProperty() {
        const propertyName = document.getElementById('newProperty').value;
        const selectedId = document.getElementById('studentId').value;

        if (propertyName && selectedId) {
            const student = this.students.find(s => s.id === parseInt(selectedId));
            if (student && student.additionalProperties[propertyName]) {
                const propertyValue = student.additionalProperties[propertyName];
                delete student.additionalProperties[propertyName];
                this.addToHistory('Удалено свойство', student.id, `${propertyName}: ${propertyValue}`);
                this.saveToStorage();
                this.updateTable();
            }
        }
    }

    showNonOlympiadStudents() {
        const nonOlympiadStudents = this.students.filter(student => !student.olympiad);
        this.updateTable(nonOlympiadStudents);
    }

    updateTable(studentsToShow = this.students) {
        const tbody = document.querySelector('#studentsTable tbody');
        tbody.innerHTML = '';

        studentsToShow.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.fullName}</td>
                <td>${student.address}</td>
                <td>${student.grade}</td>
                <td>${student.olympiad ? 'Да' : 'Нет'}</td>
                <td>${Object.entries(student.additionalProperties)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join('<br>')}</td>
            `;
            tbody.appendChild(row);
        });
    }

    updateIdSelect() {
        const select = document.getElementById('studentId');
        select.innerHTML = '<option value="">Выберите ID</option>';
        this.students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = student.id;
            select.appendChild(option);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StudentManager();
}); 