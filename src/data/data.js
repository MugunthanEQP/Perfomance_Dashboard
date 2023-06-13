async function fetchQuery() {
    const response = await fetch(
        // 'https://load900108intstg.blob.core.windows.net/qadashboard/performance/student web client/Dashboard Changes/23.1/900108/PerformanceSummary.json?sp=racwdli&st=2023-01-11T10:58:00Z&se=2023-12-30T18:58:00Z&spr=https&sv=2021-06-08&sr=c&sig=GTZDo4GuuXM4HsP8Tt6l%2FX%2FUgKh0P5GOPa%2Fqhe3NX%2Fo%3D'
        'https://reqres.in/api/users?page=2'
    );
    // .then((result) => {
    //     const appData = result.data;
    //     console.log(appData);
    // })
    // .catch((error) => {
    //     console.error(error);
    // });
    // waits until the request completes...
    // console.log(response);
    // return response.Data;
}

var Data = fetchQuery();

export default Data;
