function submitForm(event) {
    event.preventDefault();

    try {
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            birthDate: document.getElementById('birthDate').value,
            startedListening: document.getElementById('startedListening').value,
            composers: Array.from(document.querySelectorAll('input[name="composers"]:checked'))
                .map(cb => cb.value),
            frequency: document.querySelector('input[name="frequency"]:checked')?.value,
            preferredEra: document.getElementById('preferredEra').value
        };

        if (!formData.fullName || !formData.email || !formData.birthDate || 
            !formData.startedListening || !formData.frequency || !formData.preferredEra) {
            throw new Error('Пожалуйста, заполните все обязательные поля');
        }

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            throw new Error('Пожалуйста, введите корректный email адрес');
        }

        // Открываем новое окно с заданными параметрами
        const resultWindow = window.open('', 'Results', 
            'width=600,height=400,resizable=no');

        // Создаем HTML для нового окна
        const resultHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Результаты опроса</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    table { 
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 2px solid #333;
                        padding: 10px;
                        text-align: left;
                    }
                    th { background-color: #f0f0f0; }
                </style>
            </head>
            <body>
                <h2>Результаты опроса</h2>
                <table>
                    <tr>
                        <th>Поле</th>
                        <th>Значение</th>
                    </tr>
                    <tr>
                        <td>Имя</td>
                        <td>${formData.fullName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>${formData.email}</td>
                    </tr>
                    <tr>
                        <td>Дата рождения</td>
                        <td>${formData.birthDate}</td>
                    </tr>
                    <tr>
                        <td>Начало прослушивания</td>
                        <td>${formData.startedListening}</td>
                    </tr>
                    <tr>
                        <td>Любимые композиторы</td>
                        <td>${formData.composers.join(', ') || 'Не выбрано'}</td>
                    </tr>
                    <tr>
                        <td>Частота прослушивания</td>
                        <td>${formData.frequency}</td>
                    </tr>
                    <tr>
                        <td>Предпочитаемая эпоха</td>
                        <td>${formData.preferredEra}</td>
                    </tr>
                </table>
            </body>
            </html>
        `;

        resultWindow.document.write(resultHTML);
        resultWindow.document.close();

        document.getElementById('surveyForm').reset();

    } catch (error) {
        alert(error.message);
    }

    return false;
}
