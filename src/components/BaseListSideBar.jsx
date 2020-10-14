import React from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default function BaseListSideBar(props) {
    const { filterHandler } = props;
    return (
        <div className='d-flex flex-row'>
            <div>
                <InputLabel id='label'>Filter by price</InputLabel>

                <Select onChange={(e) => filterHandler(e)} native defaultValue='none'>
                    <option value="none">
                        All
                    </option>
                    <option value="1">100 or less</option>
                    <option value="2">100 - 150</option>
                    <option value="3">150 or more</option>
                </Select>
            </div>
            
        </div>
    )
}
