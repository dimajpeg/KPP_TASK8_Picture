$(document).ready(() => {
    // Загрузка списка картин
    function loadPaintings() {
      $.get('/api/paintings', (paintings) => {
        $('#paintings-list').empty();
        paintings.forEach((painting) => {
          const smallClass = painting.id % 2 === 0 ? 'small' : ''; // Применяем класс small к четным картинам
          $('#paintings-list').append(`
            <div class="painting" data-id="${painting.id}">
              <h3>${painting.title}</h3>
              <p>Artist: ${painting.artist}</p>
              <p>Description: ${painting.description}</p>
              <p>Starting Price: $${painting.startingPrice}</p>
              <p>Min Step: $${painting.minStep}</p>
              <p>Max Step: $${painting.maxStep}</p>
              <img src="images/${painting.image}" alt="${painting.title}" class="${smallClass}">
              <button class="edit-painting">Edit</button>
              <button class="delete-painting">Delete</button>
            </div>
          `);
        });
      });
    }
  
    // Загрузка списка участников
    function loadParticipants() {
      $.get('/api/participants', (participants) => {
        $('#participants-list').empty();
        participants.forEach((participant) => {
          $('#participants-list').append(`
            <div class="participant" data-id="${participant.id}">
              <h3>${participant.name}</h3>
              <p>Funds: $${participant.funds}</p>
              <button class="edit-participant">Edit</button>
              <button class="delete-participant">Delete</button>
            </div>
          `);
        });
      });
    }
  
    // Добавление новой картины
    $('#add-painting-form').submit((e) => {
      e.preventDefault();
      const newPainting = {
        title: $('#title').val(),
        artist: $('#artist').val(),
        description: $('#description').val(),
        image: $('#image').val(),
        startingPrice: $('#startingPrice').val(),
        minStep: $('#minStep').val(),
        maxStep: $('#maxStep').val()
      };
      $.post('/api/paintings', newPainting, () => {
        loadPaintings();
        $('#add-painting-form')[0].reset();
      });
    });
  
    // Добавление нового участника
    $('#add-participant-form').submit((e) => {
      e.preventDefault();
      const newParticipant = {
        name: $('#name').val(),
        funds: $('#funds').val()
      };
      $.post('/api/participants', newParticipant, () => {
        loadParticipants();
        $('#add-participant-form')[0].reset();
      });
    });
  
    // Загрузка данных при загрузке страницы
    loadPaintings();
    loadParticipants();
  
    // Обработчики для редактирования и удаления картин и участников
    $('#paintings-list').on('click', '.edit-painting', function() {
      const id = $(this).parent().data('id');
      const painting = $(this).parent();
      const updatedPainting = {
        title: prompt('Enter new title', painting.find('h3').text()),
        artist: prompt('Enter new artist', painting.find('p:nth-child(2)').text().replace('Artist: ', '')),
        description: prompt('Enter new description', painting.find('p:nth-child(3)').text().replace('Description: ', '')),
        image: prompt('Enter new image filename', painting.find('img').attr('src').replace('images/', '')),
        startingPrice: prompt('Enter new starting price', painting.find('p:nth-child(4)').text().replace('Starting Price: $', '')),
        minStep: prompt('Enter new min step', painting.find('p:nth-child(5)').text().replace('Min Step: $', '')),
        maxStep: prompt('Enter new max step', painting.find('p:nth-child(6)').text().replace('Max Step: $', ''))
      };
      $.ajax({
        url: `/api/paintings/${id}`,
        type: 'PUT',
        data: JSON.stringify(updatedPainting),
        contentType: 'application/json',
        success: () => {
          loadPaintings();
        }
      });
    });
  
    $('#paintings-list').on('click', '.delete-painting', function() {
      const id = $(this).parent().data('id');
      $.ajax({
        url: `/api/paintings/${id}`,
        type: 'DELETE',
        success: () => {
          loadPaintings();
        }
      });
    });
  
    $('#participants-list').on('click', '.edit-participant', function() {
      const id = $(this).parent().data('id');
      const participant = $(this).parent();
      const updatedParticipant = {
        name: prompt('Enter new name', participant.find('h3').text()),
        funds: prompt('Enter new funds', participant.find('p').text().replace('Funds: $', ''))
      };
      $.ajax({
        url: `/api/participants/${id}`,
        type: 'PUT',
        data: JSON.stringify(updatedParticipant),
        contentType: 'application/json',
        success: () => {
          loadParticipants();
        }
      });
    });
  
    $('#participants-list').on('click', '.delete-participant', function() {
      const id = $(this).parent().data('id');
      $.ajax({
        url: `/api/participants/${id}`,
        type: 'DELETE',
        success: () => {
          loadParticipants();
        }
      });
    });
  });