export const buildCharts = (data) => {
    const charts = [];

    if (!data?.summary) return charts;

    const entries = Object.entries(data.summary);

    let pieCount = 0;

    entries.forEach(([key, val]) => {

        // NUMERIC → mix bar + line
        if (val.type === "numeric") {
            charts.push({
                title: `${key} Overview`,
                type: Math.random() > 0.5 ? "bar" : "line",
                data: [
                    { name: "Min", value: val.min },
                    { name: "Mean", value: val.mean },
                    { name: "Max", value: val.max }
                ]
            });
        }

        // CATEGORICAL → LIMIT PIE CHARTS
        else if (val.type === "categorical") {
            if (pieCount < 2) {
                charts.push({
                    title: `${key} Distribution`,
                    type: "pie",
                    data: (val.topValues || []).map(v => ({
                        name: v.name,
                        value: v.count
                    }))
                });
                pieCount++;
            }
        }
    });

    return charts;
};