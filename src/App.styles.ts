import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton';

export const Wrapper = styled.div`
&& {
    margin: 40px;
}
`;

export const StyledButton = styled(IconButton)`

&& {
    position: fixed;
    z-index: 100;
    right: 20px;
    top: 20px;
    height: 60px;
    width: 60px;
    background: #90D7FF;
    border-radius: 45px;
    transition: transform .4s;

    :hover {
        background: #C2E9FF;
        transform: scale(1.2, 1.2);
    }
}
`;

export const StyledButton2 = styled(IconButton)`
&& {
    position: fixed;
    z-index: 100;
    right: 20px;
    bottom: 20px;
    height: 60px;
    width: 60px;
    background: #90D7FF;
    border-radius: 45px;
    transition: transform .4s;

    :hover {
        background: #C2E9FF;
        transform: scale(1.2, 1.2);
    }
}
`;
