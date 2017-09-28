{% if item.since.length > 1 %}
  <h3 class="item__sub-heading">Changelog</h3>

  <table class="item__changelog">
  	<tbody>
	    {% for since in item.since %}
        <tr class="item__changelog__row">
          <th scope="row" data-label="version"><b>v{{ since.version }}</b></th>
          <td data-label="description">{% if since.description %}{{ since.description|safe }}{% endif %}</td>
        </tr>
	    {% endfor %}
  	</tbody>
  </table>

{% endif %}
