library(dplyr)
library(tclust)

clonesClustering <- function(inputFile, outputFile, clonesK, clonesAlpha) {
  source(inputFile)
  
  # Inform chosen arguments
  cat("functionClustering TCLUST arguments: k=", clonesK, ", alpha=", clonesAlpha, "\n")
  
  # Cluster only the metric columns
  jsMetricsColumnsOnly = js[,c(3,4,5,6,7,8,9,10,11,12)]
  
  # Execute cluster procedure
  set.seed(999) # fix initial seed to make runs repeatable
  functionClusters <- tclust (jsMetricsColumnsOnly, k = clonesK, alpha = clonesAlpha)
  
  # Inform number of clusters found
  cat("Total number of clusters found:", functionClusters$k, "\n")
  
  cat("Initiating CSV export...\n")
  
  createCsvDataFrameForClusterNumber <- function(clusterNumber) {
    cat("Exporting cluster ", clusterNumber, "...\n")
    inCluster = which(functionClusters$cluster == clusterNumber)
    thisClusterCsv <- js[inCluster,c(1,2,3,4,5,6,7,8,9,10,11,12)]
    thisClusterCsv <- mutate(thisClusterCsv, cluster = clusterNumber)
    return (thisClusterCsv)
  }
  
  allClustersCsv <- createCsvDataFrameForClusterNumber(1)
  for(i in 2:functionClusters$clonesK) allClustersCsv <- rbind(allClustersCsv, createCsvDataFrameForClusterNumber(i))
  
  cat("Saving CSV file...\n")
  
  write.table(allClustersCsv, file = outputFile, sep = ",", col.names = NA, qmethod = "double")
  
  cat("CSV export complete.\n")
}

clonesK <- 70;
clonesAlpha <- 0.90;
clonesClustering("allFilesFunctionMetrics.R", "clonesClustering_generatedClusters.csv", clonesK, clonesAlpha)
