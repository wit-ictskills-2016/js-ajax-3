const checkinTestData = [
  {
    name: 'Bodega!',
    checkins: 181,
    users: 41,
    link: 'https://foursquare.com/v/bodega/4d8c8c916174a09396389be3',
  },
  {
    name: 'Carters Chocklate Cafe',
    checkins: 159,
    users: 55,
    link: 'https://foursquare.com/v/carters-chocolate-cafe/4cea8f1ffe90a35d23714e0e',
  },
  {
    name: 'Geoffs Cafe Bar',
    checkins: 802,
    users: 286,
    link: 'https://foursquare.com/v/geoffs-caf%C3%A9-bar/4b899439f964a5205a4332e3',
  },
];

function displayCheckins(checkins) {
  for (var i = 0; i < checkins.length; i++) {
    $('#venue_table').append('<tr><td>' + checkins[i].name + '</td>' +
        '<td>' + checkins[i].checkins + '</td>' +
        '<td>' + checkins[i].users + '</td>' +
        '<td>' + checkins[i].link + '</td></tr>');
  }
}

$('#search_btn').click(function () {
  console.log(fsConfig);
  displayCheckins(checkinTestData);
});
