//Задание 2: Частичное обновление с помощью PATCH
//Цель: Обновить только определенные части данных на сервере с использованием метода PATCH.
//Задачи:
//Создайте HTML форму с полями для ввода данных (например, только описание товара).
//Напишите JavaScript код, который будет отправлять 
//PATCH запрос на сервер с введенными данными при нажатии на кнопку.
//Обработайте ответ от сервера и выведите сообщение о частичном обновлении данных.

document.addEventListener('DOMContentLoaded', function () {
  const updateButton = document.getElementById('updateButton');
  const messageElement = document.getElementById('message');

  updateButton.addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const data = {
      name: name,
      email: email
    };

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch('https://jsonplaceholder.typicode.com/users/2', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.partialUpdate) {
          messageElement.textContent = 'Данные успешно частично обновлены.';
        } else {
          messageElement.textContent = 'Ошибка при обновлении данных.';
        }
      })
      .catch(error => {
        messageElement.textContent = 'Произошла ошибка: ' + error.message;
      });
  });
});


//Задание 3: Удаление данных с помощью DELETE
//Цель: Удалить запись на сервере с использованием метода DELETE.
//Задачи:
//Создайте список элементов (например, список задач или товаров) со списком наименований и кнопками удаления.
//Напишите JavaScript код, который будет отправлять DELETE 
//запрос на сервер для удаления выбранной записи при нажатии на кнопку удаления.
//Обработайте ответ от сервера и обновите список после успешного удаления.

document.addEventListener('DOMContentLoaded', function () {
  const deleteButtons = document.querySelectorAll('.deleteButton');
  const itemList = document.getElementById('itemList');

  // Добавляем обработчик события для каждой кнопки удаления
  deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const listItem = button.parentElement;
      const itemText = listItem.textContent.trim();

      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item: itemText })
      };

      fetch('https://jsonplaceholder.typicode.com/users/3', requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            // Удаляем элемент из списка после успешного удаления на сервере
            itemList.removeChild(listItem);
          } else {
            console.log('Ошибка при удалении элемента.');
          }
        })
        .catch(error => {
          console.log('Произошла ошибка: ' + error.message);
        });
    });
  });
});
