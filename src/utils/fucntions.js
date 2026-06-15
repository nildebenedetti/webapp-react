const formatDate = (isoDate) => {
    const dataObject = new Date(isoDate);

    const formattedDate = dataObject.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-');

    return formattedDate;
};

export { formatDate };