  $( function() {
    var availableTags = [
      "New Sangavi",
      "Pimple Gurav",
      "Aundh",
      "Wakad",
      "Vishal nagar",
      "Hinjewadi",
      "Viman nagar",
      "Kharadi",
      "Pimpari",
      "Shivaji nagar",
      "Swargate",
      "Katraj",
      "Shivaji Nagar",
      "Chichwad",
      "Chandan Nagar",
      "Shastri Nagar",
      "Koregaon Park",
      "Old Sangavi",
      "Katepuram",
      "Pimple Saudagar",
      "Pimple Nilakh",
      "Pune Station"
    ];
    $( "#searchbox" ).autocomplete({
      source: availableTags
    });
  } );