class APIFeatures {
  constructor(query, queryString) {
    this.queryToDB = query;
    this.queryString = queryString;
  }

  // The following methods only works because the use of RETURN THIS
  // that line returns the object that is being build
  filterData() {
    let queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'field'];
    // Remove fields not related with the data itself
    excludedFields.forEach((el) => delete queryObj[el]);

    //1. Add object containing user filters
    this.queryToDB = this.queryToDB.find(queryObj);
    return this;
  }

  sortData() {
    //2. Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.queryToDB = this.queryToDB.sort(sortBy);
    } else {
      this.queryToDB = this.queryToDB.sort('-createdAt');
    }
    return this;
  }

  limitFieldsData() {
    //3. Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.queryToDB = this.queryToDB.select(fields);
    } else {
      this.queryToDB = this.queryToDB.select('-__v ');
    }
    return this;
  }

  paginateData() {
    //4. Pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.queryToDB = this.queryToDB.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
