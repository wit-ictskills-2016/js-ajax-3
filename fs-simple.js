var fsCredentials = '&client_id=' + fsConfig.client_id + '&client_secret=' + fsConfig.client_secret + '&v=20140601';

function displayCheckins(checkins) {
  for (let checkin of checkins) {
    $('#venue_table').append(`
      <tr>
        <td>  ${checkin.name}  </td>
        <td>  ${checkin.checkins}  </td>
        <td>  ${checkin.users} </td>
        <td>  ${checkin.link}  </td>
      </tr>`);
  }
}

function loadVenues(locationName, venueKeyword) {
  var requestOptions = {
    url: fsConfig.base_url + 'near=' + locationName + '&query=' + venueKeyword + fsCredentials,
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
      };
      checkins.push(checkin);
    }

    displayCheckins(checkins);
  });
}

$('#search_btn').click(function () {
  $('#venue_table tbody').remove();
  const locationName = $('#location_name').val();
  const venueKeyword = $('#venue_keyword').val();
  loadVenues(locationName, venueKeyword);
});
