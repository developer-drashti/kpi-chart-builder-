export async function fetchAggregate(query) {
  const {
    types,
    areas,
    vest,
    metric,
    groupBy: group_by,
    from: start_time,
    to: end_time,
    minSpeed: min_speed,
    maxSpeed: max_speed,
    headingMin: min_heading,
    headingMax: max_heading,
  } = query;

  const params = new URLSearchParams({
    ...(types && { types }),
    ...(areas && { areas }),
    ...(vest && { vest }),
    ...(metric && { metric }),
    ...(group_by && { group_by }),
    ...(start_time && { start_time }),
    ...(end_time && { end_time }),
    ...(min_speed && { min_speed }),
    ...(max_speed && { max_speed }),
    ...(min_heading && { min_heading }),
    ...(max_heading && { max_heading }),
  });

  const res = await fetch(`/api/aggregate?${params}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
