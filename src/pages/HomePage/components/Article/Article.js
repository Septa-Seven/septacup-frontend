import React, {Fragment, useMemo} from 'react';
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {articleDispatchTable} from "../../../../utils/articleDispatchTable";
import {Link} from "react-router-dom";

export const Article = ({article}) => {
    console.log(article);
    const {id, title} = article;

    // Парсим новость из админки
    const newsElements = useMemo(() => {
        if(article.body) {
            const blocks = article.body.blocks;
            return blocks.map((block, index) => {
                if(index < 3 && block.type !== 'Delimiter') {
                    const createElement = articleDispatchTable.get(block.type);
                    if(createElement) {
                        return createElement(block.data);
                    }
                }
            })
        }
    }, [article])

    return (
        <Fragment>
            <Box>
                <Link to={`news/${id}/`} key={title} ><Typography variant={"h4"}>{title}</Typography></Link>

                {newsElements && newsElements.map((item, index) => (<Fragment key={index}>{item}</Fragment>))}
            </Box>
        </Fragment>
    )
}
