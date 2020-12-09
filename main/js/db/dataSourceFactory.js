class DataSourceFactory {
    static getInstance() {
        if (DataSourceFactory.dataSource === undefined) {
            DataSourceFactory.dataSource = new LocalStorageDataSourceImpl();
            return DataSourceFactory.dataSource;
        }

        return DataSourceFactory.dataSource;
    }
}
