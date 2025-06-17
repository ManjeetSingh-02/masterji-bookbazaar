// function to paginate an array
export function paginateResources(resources, pageSize) {
  const paginatedResources = [];
  // loop through all resources and paginate them
  for (let i = 0; i < resources.length / pageSize; i++) {
    // temporary array to store resources for current page
    const temp = [];

    // loop through pageSize resources for current page
    for (let j = 0; j < pageSize; j++) {
      if (resources[i * pageSize + j]) temp.push(resources[i * pageSize + j]);
    }

    // if no resources found for current page, break the loop
    if (temp.length === 0) break;

    // push current page and resources to paginatedResources
    paginatedResources.push({
      page: i + 1,
      items: temp,
    });
  }

  return paginatedResources;
}
