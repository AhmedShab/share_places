import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ListItem from '../ListItem/ListItem';

const placeList = props => {
    return (
        <FlatList
            style={styles.listContainer}
            data={props.places}
            renderItem={(info) => (
                <ListItem
                    placeName={info.item.name}
                    placeImage={info.item.image}
                    onItemPressed={() => props.onItemDeleted(info.item.key)} />
            )}>
        </FlatList>
    )
}
export default placeList;

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    }
});