var gear = firebase.database().ref();
	
	/**
	 * Calls function every time the database changes.
	 * @param {DataSnapshot} snapshot - DataSnapshot of the database
	 */
	gear.on('value', function(snapshot) { 
	  $('#ex-table').html('');
	  if(!snapshot.exists()) { return; }
	  var content = '';
	  
	  /**
	   * Calls function for every table in the database and begins HTML formating of the table.
	   * @param {DataSnapshot} tableSnapshot - DataSnapshot of the current table
	   */
	  snapshot.forEach(function(tableSnapshot){
	    if(!tableSnapshot.exists()) { return; }
		content += '<h1>' + tableSnapshot.key + '</h1>'; 	                        // table title
		content += '<table>'; 								// table begins
		
		/**
	         * Calls function for every row in the current table and formats the HTML table row.
		 * @param {DataSnapshot} rowSnapshot - DataSnapshot of the current row
	         */
		tableSnapshot.forEach(function(rowSnapshot){
		  if(!rowSnapshot.exists()) { return; }
		  content += '<tr>'; 								// row begins
		  var header = false;
		  if(rowSnapshot.key == 0) { header = true; }		                        // header row support
		  
		  /**
	           * Calls function for every datum of the current row and formats the HTML cell.
		   * @param {DataSnapshot} dataSnapshot - DataSnapshot of the current cell
	           */
		  rowSnapshot.forEach(function(dataSnapshot){
		    if(!dataSnapshot.exists()||dataSnapshot.val()==null) { return; }
		    if(header){ content += '<th>' + dataSnapshot.val() + '</th>'; }
			else { content += '<td>' + dataSnapshot.val() + '</td>'; }
		  });
		  
		  content += '</tr>'; 								// row ends
		});
		
		content += '</table>'; 								// table ends
	  });
		
      $('#ex-table').append(content);
	});
