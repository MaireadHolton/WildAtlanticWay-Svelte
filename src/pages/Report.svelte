<script>
    import LoggedInHeader from '../components/LoggedInHeader.svelte';
    import VisitList from '../components/VisitList.svelte';
    import Chart from "svelte-frappe-charts";
    import VisitImage from '../components/VisitImage.svelte';
    import {onMount} from "svelte";
    import {wawService} from "../services/waw-service";

    let data = {
        labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        datasets: [
            {
                values: [10, 12, 3, 9, 8, 15, 9]
            }
        ]
    };
    let visitsPerCounty = {
        labels: [],
        datasets: [
            {
                values: [0, 0]
            }
        ]
    };

    onMount(async () =>{
        let VisitList = await wawService.getAllVisits();
        let counties = await wawService.getAllCounties();
        visitsPerCounty.labels = [];
        counties.forEach((county) => {
            visitsPerCounty.labels.push('$county.nameEng');
            visitsPerCounty.datasets[0].values.push(0);
        });
        counties.forEach((county, i) => {
            VisitList.forEach((visit) => {
                if (visit.county_id == county_id) {
                    visitsPerCounty.datasets[0].values[i] += 1
                }
            });
                
            });
        });

</script>

<LoggedInHeader />

<div class="columns is-vcentered">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Trips to date</h1>
        <VisitList />
        <Chart {data} type="line" />
    </div>
</div>
<div class="column has-text-centered">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Visits per county</h1> 
    <Chart data={visitsPerCounty} type="bar" />
    </div>
</div>
<div class="border-box">
    <div class="column right has-text-centered">
        <VisitImage/>
    </div>
</div>
