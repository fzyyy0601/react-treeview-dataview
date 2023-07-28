import React, { useState}  from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';

const TreeView = ((onSelect, treeData, expandedKeys, onExpand, defaultExpanKeys)=>{

    return(
        <Tree
        showLine
        switcherIcon={<DownOutlined />}
       // defaultExpandedKeys={defaultExpanKeys}
        //onSelect={onSelect}
        treeData={treeData}
        //expandedKeys={expandedKeys}
        //onExpand={onExpand}
        defaultExpandAll={false} // Expand all level
        />
    )
})
export default TreeView;