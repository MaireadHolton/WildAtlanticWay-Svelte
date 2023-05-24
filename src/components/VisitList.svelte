<script>
  import { getContext, onMount } from "svelte";

  const wawService = getContext("wawService");
  /**
   * @type {any[]}
   */
  let visitList = [];

  onMount(async () => {
    visitList = await wawService.getAllVisits();
  });
</script>

<table class="table is-fullwidth">
  <theader>
    <th>Location</th>
    <th>Latitude</th>
    <th>Longitude</th>
    <th>Date</th>
    <th>Details</th>
    <th>County</th>
    <th>Visitor</th>
  </theader>
  <tbody>
    {#each visitList as visit}
      <div class="box box-link-hover-shadow">
        <td>
          {visit.location}
        </td>
        <td>
          {visit.latitude}
        </td>
        <td>
          {visit.longitude}
        </td>
        <td>
          {visit.date}
        </td>
        <td>
          {visit.details}
        </td>
        <td>
          {visit.county.nameEng}, {visit.county.nameIrish}, {visit.county
            .countyTown}
        </td>
        <td>
          {visit.visitor.firstName}, {visit.visitor.lastName}
        </td>
      </div>
    {/each}
  </tbody>
</table>
