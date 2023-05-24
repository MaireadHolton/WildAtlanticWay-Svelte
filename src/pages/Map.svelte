<script>
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import VisitMap from "../components/visitMap.svelte";
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
      <TitleBar subTitle={"Map of Visit Locations"} title={"myWildAtlanticWay"}/>
    </div>
    <div class="column">
      <MainNavigator/>
    </div>
  </div>

<VisitMap />
