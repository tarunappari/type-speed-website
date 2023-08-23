
import { Chart as ChartJS , CategoryScale , PointElement ,LinearScale , LineElement , Title ,Tooltip , Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useThemeContext } from "../Context/ThemeContext";

ChartJS.register(
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
) 


const Graph = ({graphData}) =>{

    let {theme} = useThemeContext();

    return(
        <div>
            <Line 
                  data={
                    {
                        labels : graphData.map(i => i[0]),
                        datasets : [
                            {
                                data :graphData.map(i => i[1]),
                                label : 'WPM',
                                borderColor : theme.timer,
                            }
                        ]
                    }
                  }     
            />
        </div>
    )
}

export default Graph;