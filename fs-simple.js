var fsCredentials = '&client_id=' + fsConfig.client_id + '&client_secret=' + fsConfig.client_secret + '&v=20140601';

function displayCheckins(checkins, cardSection) {
  for (let checkin of checkins) {
    cardSection.append(`
        <a class="ui link raised card" href="${this.url}">
          <div class="ui content">
            <div class="right floated meta">
              <div class="ui teal circular label"> ${checkin.rating}</div>
            </div>
            <div class="header">${checkin.name}</div>
          </div>
          <div class="ui image">
            <img src="${checkin.imageUrl}">
          </div>
          <div class="content">
          </div>
          <div class="extra content">
            <span class="right floated">
              ${checkin.checkins} Checkins
            </span>
            <span>
              <i class="user icon"></i>
              ${checkin.users} Users
            </span>
          </div>
        </a>`);
  }
}

function loadVenues(locationName, venueKeyword, cardSection) {
  var requestOptions = {
    url: fsConfig.base_url + 'near=' + locationName + '&query=' + venueKeyword + '&venuePhotos=1' + fsCredentials,
    method: 'GET',
    json: {},
  };
  $.getJSON(requestOptions.url, {}, body => {
    const venues = body.response.groups[0].items;
    const checkins = [];
    for (let venue of venues) {
      const checkin = {
        name: venue.venue.name,
        checkins: venue.venue.stats.checkinsCount,
        users: venue.venue.stats.usersCount,
        url: venue.venue.url,
        rating: venue.venue.rating,
      };

      if (venue.venue.photos.count) {
        const prefix = venue.venue.photos.groups[0].items[0].prefix;
        const suffix = venue.venue.photos.groups[0].items[0].suffix;
        checkin.imageUrl = prefix + 'original' + suffix;
      }

      checkins.push(checkin);
    }

    displayCheckins(checkins, cardSection);
  });
}

$('#search_btn').click(function () {
  $('#venue_table tbody').remove();
  const locationName = $('#location_name').val();
  const venueKeyword = $('#venue_keyword').val();
  loadVenues(locationName, venueKeyword, $('#venue_cards'));
});
